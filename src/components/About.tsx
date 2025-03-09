import { version } from "../../package.json"; // Adjust the path as necessary

function About() {
  return (
    <div className="flex flex-col gap-4 p-4 text-neutral-300">
      <h1 className="text-2xl font-bold text-neutral-200">About</h1>
      <p>Version {version}</p>
    </div>
  );
}

export default About;
