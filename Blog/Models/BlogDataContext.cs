using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace Blog.Models
{
    public partial class BlogDataContext : DbContext
    {
        public BlogDataContext()
        {
        }

        public BlogDataContext(DbContextOptions<BlogDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Article> Article { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<FollowUser> FollowUser { get; set; }
        public virtual DbSet<StarArticle> StarArticle { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Program.Configuration.GetConnectionString("default"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>(entity =>
            {
                entity.Property(e => e.Content).HasColumnType("ntext");

                entity.Property(e => e.DeliverTime).HasColumnType("datetime");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(70);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Article)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Article_User");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DeliverDate).HasColumnType("datetime");

                entity.HasOne(d => d.Article)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.ArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Article");

                entity.HasOne(d => d.CommentNavigation)
                    .WithMany(p => p.InverseCommentNavigation)
                    .HasForeignKey(d => d.CommentId)
                    .HasConstraintName("FK_Comment_Comment");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<FollowUser>(entity =>
            {
                entity.HasKey(e => new { e.FollowId, e.UserId });

                entity.Property(e => e.FollowDate).HasColumnType("datetime");

                entity.HasOne(d => d.Follow)
                    .WithMany(p => p.FollowUserFollow)
                    .HasForeignKey(d => d.FollowId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowUser_User");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FollowUserUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FollowUser_User1");
            });

            modelBuilder.Entity<StarArticle>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ArticleId });

                entity.Property(e => e.StarDate).HasColumnType("datetime");

                entity.HasOne(d => d.Article)
                    .WithMany(p => p.StarArticle)
                    .HasForeignKey(d => d.ArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StarArticle_Article");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.StarArticle)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StarArticle_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Nickname).HasMaxLength(20);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.ProfilePhoto).HasMaxLength(30);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
