<template>
  <div class="play">
        <GameBackground />
        <PlayHeader />
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
                        <div class="rounds"></div>
                        <!-- <a ng-class="finalSoundFound === true ? '' : 'displayNone'" class="award" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Nice, here your award!</a> -->
                    </div>
                </div>
                <!-- END OF LEFT BOARD -->
                <!-- RIGHT BOARD -->
                <div class="rightBoard">
                    <div class="rightScore" ng-if="numberOfPizza > 0">
                          youGotIt.length / numberOfPizza &#9834;
                    </div>
                </div>
                <!-- END OF RIGHT BOARD -->
                <!-- Pizza -->
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
import PlayHeader from '@/components/Banners/PlayHeader.vue'
import GameBackground from '@/components/Images/GameBackground.vue'
import GameAnswerInput from '@/components/Inputs/GameAnswerInput.vue'

export default {
  components: {
    PlayHeader,
    GameBackground,
    GameAnswerInput
  }
}
</script>