  // Step 3 submit (verify code)
  // const handleVerify = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")
  //   setLoading(true)
  //   try {
  //     const code = otp.join("")
  //     const result = await verifyCode(email, code)
  //     if (result.success) {
  //       setStep(4) // success message
  //     } else {
  //       setError("Invalid or expired code.")
  //     }
  //   } catch {
  //     setError("Something went wrong.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }




  <section className="py-24 px-4 sm:px-6 bg-gray-50" id="pricing">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-4xl">
        Pricing Plans
      </h2>
      <p className="mt-4 text-gray-600 text-sm sm:text-base">
        Choose a plan that fits your school’s needs.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tiers.map((tier, i) => {
        const convertedPrice = tier.price * conversionRates[currency];

        return (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between border hover:shadow-2xl transition ${
              tier.highlight
                ? "border-blue-600 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-4 text-3xl sm:text-4xl font-bold text-blue-600">
                {currencySymbols[currency]}
                {convertedPrice.toFixed(2)}
              </p>
              <ul className="mt-6 space-y-3 text-gray-600 text-sm sm:text-base">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={() => setSignupOpen(true)}
              className={`mt-8 w-full rounded-xl py-3 font-medium shadow-md transition ${
                tier.highlight
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-90"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Start Free Trial
            </button>

            {/* signupModal */}
            <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
          </motion.div>
        );
      })}

      {/* ⭐ Custom School System Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: tiers.length * 0.1 }}
        viewport={{ once: true }}
        className="rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between border border-dashed border-indigo-400 bg-white hover:shadow-2xl transition"
      >
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Custom School System
          </h3>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Have unique needs? Let us build a tailored system for your school.
          </p>
        </div>

        <a
          href="#contact"
          className="mt-8 w-full rounded-xl py-3 font-medium shadow-md bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center hover:opacity-90 transition"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
  </div>
</section>