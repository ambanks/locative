class Api::JourneysController < ApplicationController
  # before_action :set_journey, only: [:show, :update, :destroy]

  # GET /journeys
  # GET /journeys.json
  def index
    @journeys = Journey.all
    render json: @journeys
  end

  # GET /journeys/1
  # GET /journeys/1.json
  def show
    journey = Journey.find(params[:id])
    render json: { journey: journey, posts: journey.posts }
  end

  # POST /journeys
  # POST /journeys.json
  def create
    @journey = Journey.new(journey_params)

    if @journey.save
      render json: @journey, status: :created, location: @journey
    else
      render json: @journey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /journeys/1
  # PATCH/PUT /journeys/1.json
  def update
    @journey = Journey.find(params[:id])

    if @journey.update(journey_params)
      head :no_content
    else
      render json: @journey.errors, status: :unprocessable_entity
    end
  end

  # DELETE /journeys/1
  # DELETE /journeys/1.json
  def destroy
    @journey.destroy

    head :no_content
  end

  private

    def set_journey
      @journey = Journey.find(params[:id])
    end

    def journey_params
      params.require(:journey).permit(:name, :date, :user_id)
    end
end
