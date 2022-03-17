"""Initial Migration

Revision ID: 355cabaafc94
Revises: 
Create Date: 2022-03-17 08:40:47.718103

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '355cabaafc94'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('repos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('html_url', sa.String(), nullable=True),
    sa.Column('owner', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('language', sa.String(), nullable=True),
    sa.Column('language_url', sa.String(), nullable=True),
    sa.Column('repo_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.String(length=200), nullable=True),
    sa.Column('profile_pic_path', sa.String(), nullable=True),
    sa.Column('pass_secure', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('repos')
    # ### end Alembic commands ###
