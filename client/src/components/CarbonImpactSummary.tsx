import { Button } from '@/components/ui/button';

interface CarbonImpactSummaryProps {
  carbonSaved: string;
  percentReduction: string;
  onShareResults: () => void;
  onSavePlan: () => void;
}

const CarbonImpactSummary: React.FC<CarbonImpactSummaryProps> = ({
  carbonSaved,
  percentReduction,
  onShareResults,
  onSavePlan
}) => {
  return (
    <div className="p-4 border-t border-neutral-200 bg-neutral-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Environmental Impact</h3>
          <p className="text-neutral-600 mt-1">By using suggested options instead of individual cars</p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center">
          <div className="mr-6">
            <div className="text-2xl font-bold text-success">{carbonSaved}kg</div>
            <div className="text-sm text-neutral-600">CO₂ Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{percentReduction}%</div>
            <div className="text-sm text-neutral-600">Reduction</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors mr-2"
          onClick={onShareResults}
        >
          <span className="material-icons mr-1 text-sm">share</span>
          Share Results
        </Button>
        <Button
          className="border border-neutral-400 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
          onClick={onSavePlan}
          variant="outline"
        >
          <span className="material-icons mr-1 text-sm">save</span>
          Save Plan
        </Button>
      </div>
    </div>
  );
};

export default CarbonImpactSummary;
