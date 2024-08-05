class Api::V1::BlogsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
        if params[:tags].present? && params[:tags] != 'All'
            @blogs = Blog.where(tag: params[:tags])
        else
            @blogs = Blog.all
        end
        render json: @blogs, status: :ok
    end

    def update_counter
        @blog = Blog.find(params[:id])
        if params[:count_for] == 'like'
            @blog.update(likes_count: @blog.likes_count + 1)
        elsif params[:count_for] == 'dislike'
            @blog.update(dislikes_count: @blog.dislikes_count + 1)
        end
        render json: @blog, status: :ok
    end

    def create
        @blog = Blog.new(blog_params)
        if @blog.save
            render json: { data: @blog, status: 'success' }, status: :ok
        else
            render json: { data: @blog.errors.full_messages , status: 'failure'}, status: :unprocessable_entity
        end
    end

    private

    def blog_params
        params.require(:blog).permit(:title, :tag)
    end
end
