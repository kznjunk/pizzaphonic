<template>
  <div class="play">
        <GameBackground />
        <!-- OVERLAY -->
        <div class="pageOverlay">
            <div class="correctAnswer displayNone" ng-class="currentOverlay === 1 && lifes > 0 ? '' : 'displayNone'"></div>
            <div class="finalAnswer displayNone" ng-class="currentOverlay === 2 && lifes > 0 ? '' : 'displayNone'">
                <div class="overlayTitle">Good Job!</div>
                <div></div>
            </div>
            <div class="gameOver displayNone" ng-class="currentOverlay === 4 && lifes === 0 ? '' : 'displayNone'">
                <div class="overlayTitle">Game Over!</div>
                <div class="overlaySubTtle">Your score is ♪!</div><br/>
                <div class="resetButton">
                    <a href="https://twitter.com/intent/tweet?text=@kibwashere, YAY!!%20I%20scored%20 todo score %20♪%20on%20%23pizzaphonic" target="_blank"  onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');return false;">
                        <span>Tweet it</span>
                    </a>
                </div>
                <div class="resetButton" >Try again</div>
            </div>
        </div>
        <!-- END OF THE OVERLAY -->
        <!-- SUCH GREAT VISUAL -->
        <div class="visual">
            <div>
                <div class="aSound" ng-repeat="n in visuelElements(20)" style="heigh:divFreqHeightpx"></div>
            </div>
        </div>
        <!-- END OF THE SUCH GREAT VISUAL -->
        <!-- MAIN CONTENT -->
        <div class="page">
            <div class="content">
                <!-- LEFT BOARD -->
                <div class="leftBoard">
                    <div class="leftMainLogo">
                        <img src="img/pp.png" alt=""/>
                        <br/>
                        <br/>
                        <div class="rounds"></div>
                        <br/>
                        <br/>
                        <a ng-class="finalSoundFound === true ? '' : 'displayNone'" class="award" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Nice, here your award!</a>
                    </div>
                </div>
                <!-- END OF LEFT BOARD -->
                <!-- RIGHT BOARD -->
                <div class="rightBoard">
                    <div class="rightLife">
                            <img ng-repeat="i in getNumber(5) track by $index" ng-src="$index < lifes ? 'img/lifeY.png' : 'img/lifeN.png'" alt="life"/>
                    </div>
                    <div class="rightScore" ng-if="numberOfPizza > 0">
                          youGotIt.length / numberOfPizza &#9834;
                    </div>
                </div>
                <!-- END OF RIGHT BOARD -->
                <!-- Pizza -->
                <div class="pizza">
                    <div class="pizzaPrevious" ng-class="indexActiveSlide === 1 ? 'displayNone' : ''" ng-click="slidePreviousClicked()"> &#8249; </div>
                    <div ng-repeat="(i, sound10) in sounds" ng-if="!$first" class="line" ng-class="{'activeSlide': i == indexActiveSlide}">
                        <div class="currentRound" ng-if="i === 15">Final round!</div>
                        <div class="currentRound" ng-if="i < 15">Round {{i}}</div><br/>
                        <div ng-repeat="(j, sound) in sound10" ng-if="!$first" class="pizza" ng-click="pizzaClicked($event, sound)">
                            <div class="circle" ng-class="sound.diff">

                            </div>
                        </div>
                    </div>
                    <div class="pizzaNext" ng-click="slideNextClicked()"> &#8250; </div>
                </div>
                <!-- END OF Pizza -->
                <!-- LOADING PIZZA -->
                <div class="loadingPizza"></div>
                <!-- END OF LOADING PIZZA -->
            </div>
        </div>
        <!-- END OF MAIN CONTENT -->
        <GameAnswerInput />
  </div>
</template>

<script>
import GameBackground from '@/components/Images/GameBackground.vue'
import GameAnswerInput from '@/components/Inputs/GameAnswerInput.vue'

export default {
  components: {
    GameBackground,
    GameAnswerInput
  }
}
</script>