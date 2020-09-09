USE [master]
GO
/****** Object:  Database [BlogData]    Script Date: 2020/9/9 下午 1:55:24 ******/
CREATE DATABASE [BlogData]
GO
ALTER DATABASE [BlogData] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BlogData].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BlogData] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BlogData] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BlogData] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BlogData] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BlogData] SET ARITHABORT OFF 
GO
ALTER DATABASE [BlogData] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BlogData] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BlogData] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BlogData] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BlogData] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BlogData] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BlogData] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BlogData] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BlogData] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BlogData] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BlogData] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BlogData] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BlogData] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BlogData] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BlogData] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BlogData] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BlogData] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BlogData] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BlogData] SET  MULTI_USER 
GO
ALTER DATABASE [BlogData] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BlogData] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BlogData] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BlogData] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BlogData] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BlogData] SET QUERY_STORE = OFF
GO
USE [BlogData]
GO
/****** Object:  Table [dbo].[Article]    Script Date: 2020/9/9 下午 1:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Article](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Title] [nvarchar](70) NOT NULL,
	[DeliverTime] [datetime] NOT NULL,
	[LoveCount] [int] NOT NULL,
	[CommitCount] [int] NOT NULL,
	[Content] [ntext] NULL,
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 2020/9/9 下午 1:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](50) NOT NULL,
	[ArticleId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[DeliverDate] [datetime] NOT NULL,
	[CommentId] [int] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FollowUser]    Script Date: 2020/9/9 下午 1:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FollowUser](
	[FollowId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[FollowDate] [datetime] NOT NULL,
 CONSTRAINT [PK_FollowUser] PRIMARY KEY CLUSTERED 
(
	[FollowId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StarArticle]    Script Date: 2020/9/9 下午 1:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StarArticle](
	[UserId] [int] NOT NULL,
	[ArticleId] [int] NOT NULL,
	[StarDate] [datetime] NOT NULL,
 CONSTRAINT [PK_StarArticle] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[ArticleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2020/9/9 下午 1:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nickname] [nvarchar](20) NULL,
	[Username] [nvarchar](20) NOT NULL,
	[PasswordHash] [char](64) NOT NULL,
	[Salt] [uniqueidentifier] NOT NULL,
	[ProfilePhoto] [nvarchar](30) NULL,
 CONSTRAINT [PK__User__3214EC07DE267684] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Article] ADD  CONSTRAINT [DF_Article_Love]  DEFAULT ((0)) FOR [LoveCount]
GO
ALTER TABLE [dbo].[Article] ADD  CONSTRAINT [DF_Article_CommitCount]  DEFAULT ((0)) FOR [CommitCount]
GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD  CONSTRAINT [FK_Article_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Article] CHECK CONSTRAINT [FK_Article_User]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Article] FOREIGN KEY([ArticleId])
REFERENCES [dbo].[Article] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Article]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Comment] FOREIGN KEY([CommentId])
REFERENCES [dbo].[Comment] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Comment]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE [dbo].[FollowUser]  WITH CHECK ADD  CONSTRAINT [FK_FollowUser_User] FOREIGN KEY([FollowId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[FollowUser] CHECK CONSTRAINT [FK_FollowUser_User]
GO
ALTER TABLE [dbo].[FollowUser]  WITH CHECK ADD  CONSTRAINT [FK_FollowUser_User1] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[FollowUser] CHECK CONSTRAINT [FK_FollowUser_User1]
GO
ALTER TABLE [dbo].[StarArticle]  WITH CHECK ADD  CONSTRAINT [FK_StarArticle_Article] FOREIGN KEY([ArticleId])
REFERENCES [dbo].[Article] ([Id])
GO
ALTER TABLE [dbo].[StarArticle] CHECK CONSTRAINT [FK_StarArticle_Article]
GO
ALTER TABLE [dbo].[StarArticle]  WITH CHECK ADD  CONSTRAINT [FK_StarArticle_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[StarArticle] CHECK CONSTRAINT [FK_StarArticle_User]
GO
USE [master]
GO
ALTER DATABASE [BlogData] SET  READ_WRITE 
GO