# Cabeçalho da biblioteca padrão &lt;random&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [geração de números pseudoaleatórios](<#/doc/numeric/random>).

### Inclui

---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | template de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Conceitos

##### Requisitos de gerador de bits aleatórios uniformes

[ uniform_random_bit_generator](<#/doc/numeric/random/UniformRandomBitGenerator>)(C++20) | especifica que um tipo se qualifica como um gerador de bits aleatórios uniformes
(concept)

### Classes

##### Engines de números aleatórios

[ linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(C++11) | implementa o algoritmo [linear congruencial](<https://en.wikipedia.org/wiki/Linear_congruential_generator> "enwiki:Linear congruential generator")
(template de classe)
[ mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(C++11) | implementa o algoritmo [Mersenne twister](<https://en.wikipedia.org/wiki/Mersenne_twister> "enwiki:Mersenne twister")
(template de classe)
[ subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(C++11) | implementa um algoritmo subtract-with-carry ([Fibonacci defasado](<https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator> "enwiki:Lagged Fibonacci generator"))
(template de classe)
[ philox_engine](<#/doc/numeric/random/philox_engine>)(C++26) | um gerador paralelizado baseado em contador
(template de classe)

##### Adaptadores de engine de números aleatórios

[ discard_block_engine](<#/doc/numeric/random/discard_block_engine>)(C++11) | descarta parte da saída de um engine de números aleatórios
(template de classe)
[ independent_bits_engine](<#/doc/numeric/random/independent_bits_engine>)(C++11) | empacota a saída de um engine de números aleatórios em blocos de um número especificado de bits
(template de classe)
[ shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)(C++11) | entrega a saída de um engine de números aleatórios em uma ordem diferente
(template de classe)

##### Geradores predefinidos

`minstd_rand0` (C++11) | [std::linear_congruential_engine]<[std::uint_fast32_t],
` `16807, 0, 2147483647>
Descoberto em 1969 por Lewis, Goodman e Miller, adotado como "Padrão mínimo" em 1988 por Park e Miller
`minstd_rand` (C++11) | [std::linear_congruential_engine]<[std::uint_fast32_t],
` `48271, 0, 2147483647>
Novo "Padrão mínimo", recomendado por Park, Miller e Stockmeyer em 1993
`mt19937` (C++11) | [std::mersenne_twister_engine]<[std::uint_fast32_t],
` `32, 624, 397, 31,
` `0x9908b0df, 11,
` `0xffffffff, 7,
` `0x9d2c5680, 15,
` `0xefc60000, 18, 1812433253>
Mersenne Twister de 32 bits por Matsumoto e Nishimura, 1998
`mt19937_64` (C++11) | [std::mersenne_twister_engine]<[std::uint_fast64_t],
` `64, 312, 156, 31,
` `0xb5026f5aa96619e9, 29,
` `0x5555555555555555, 17,
` `0x71d67fffeda60000, 37,
` `0xfff7eee000000000, 43,
` `6364136223846793005>
Mersenne Twister de 64 bits por Matsumoto e Nishimura, 2000
`ranlux24_base` (C++11) | [std::subtract_with_carry_engine]<[std::uint_fast32_t], 24, 10, 24>
---|---
`ranlux48_base` (C++11) | [std::subtract_with_carry_engine]<[std::uint_fast64_t], 48, 5, 12>
`ranlux24` (C++11) | [std::discard_block_engine]<[std::ranlux24_base], 223, 23>
Gerador RANLUX de 24 bits por Martin Lüscher e Fred James, 1994
`ranlux48` (C++11) | [std::discard_block_engine]<[std::ranlux48_base], 389, 11>
Gerador RANLUX de 48 bits por Martin Lüscher e Fred James, 1994
`knuth_b` (C++11) | [std::shuffle_order_engine]<[std::minstd_rand0], 256>
---|---
`philox4x32` (C++26) | [std::philox_engine]<[std::uint_fast32_t], 32, 4, 10,
` `0xD2511F53, 0x9E3779B9,
` `0xCD9E8D57, 0xBB67AE85>
`philox4x64` (C++26) | [std::philox_engine]<[std::uint_fast64_t], 64, 4, 10,
` `0xD2E7470EE14C6C93, 0x9E3779B97F4A7C15,
` `0xCA5A826395121157, 0xBB67AE8584CAA73B>
`default_random_engine`(C++11) | _definido pela implementação_

##### Números aleatórios não determinísticos

[ random_device](<#/doc/numeric/random/random_device>)(C++11) | gerador de números aleatórios não determinísticos usando fonte de entropia de hardware
(classe)

##### Distribuições uniformes

[ uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)(C++11) | produz valores inteiros distribuídos uniformemente em um intervalo
(template de classe)
[ uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)(C++11) | produz valores reais distribuídos uniformemente em um intervalo
(template de classe)

##### Distribuições de Bernoulli

[ bernoulli_distribution](<#/doc/numeric/random/bernoulli_distribution>)(C++11) | produz valores bool em uma [distribuição de Bernoulli](<https://en.wikipedia.org/wiki/Bernoulli_distribution> "enwiki:Bernoulli distribution")
(classe)
[ binomial_distribution](<#/doc/numeric/random/binomial_distribution>)(C++11) | produz valores inteiros em uma [distribuição binomial](<https://en.wikipedia.org/wiki/Binomial_distribution> "enwiki:Binomial distribution")
(template de classe)
[ negative_binomial_distribution](<#/doc/numeric/random/negative_binomial_distribution>)(C++11) | produz valores inteiros em uma [distribuição binomial negativa](<https://en.wikipedia.org/wiki/Negative_binomial_distribution> "enwiki:Negative binomial distribution")
(template de classe)
[ geometric_distribution](<#/doc/numeric/random/geometric_distribution>)(C++11) | produz valores inteiros em uma [distribuição geométrica](<https://en.wikipedia.org/wiki/Geometric_distribution> "enwiki:Geometric distribution")
(template de classe)

##### Distribuições de Poisson

[ poisson_distribution](<#/doc/numeric/random/poisson_distribution>)(C++11) | produz valores inteiros em uma [distribuição de Poisson](<https://en.wikipedia.org/wiki/Poisson_distribution> "enwiki:Poisson distribution")
(template de classe)
[ exponential_distribution](<#/doc/numeric/random/exponential_distribution>)(C++11) | produz valores reais em uma [distribuição exponencial](<https://en.wikipedia.org/wiki/Exponential_distribution> "enwiki:Exponential distribution")
(template de classe)
[ gamma_distribution](<#/doc/numeric/random/gamma_distribution>)(C++11) | produz valores reais em uma [distribuição gama](<https://en.wikipedia.org/wiki/Gamma_distribution> "enwiki:Gamma distribution")
(template de classe)
[ weibull_distribution](<#/doc/numeric/random/weibull_distribution>)(C++11) | produz valores reais em uma [distribuição de Weibull](<https://en.wikipedia.org/wiki/Weibull_distribution> "enwiki:Weibull distribution")
(template de classe)
[ extreme_value_distribution](<#/doc/numeric/random/extreme_value_distribution>)(C++11) | produz valores reais em uma [distribuição de valor extremo](<https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution> "enwiki:Generalized extreme value distribution")
(template de classe)

##### Distribuições normais

[ normal_distribution](<#/doc/numeric/random/normal_distribution>)(C++11) | produz valores reais em uma [distribuição normal padrão (Gaussiana)](<https://en.wikipedia.org/wiki/Normal_distribution> "enwiki:Normal distribution")
(template de classe)
[ lognormal_distribution](<#/doc/numeric/random/lognormal_distribution>)(C++11) | produz valores reais em uma [distribuição log-normal](<https://en.wikipedia.org/wiki/Lognormal_distribution> "enwiki:Lognormal distribution")
(template de classe)
[ chi_squared_distribution](<#/doc/numeric/random/chi_squared_distribution>)(C++11) | produz valores reais em uma [distribuição qui-quadrado](<https://en.wikipedia.org/wiki/Chi-squared_distribution> "enwiki:Chi-squared distribution")
(template de classe)
[ cauchy_distribution](<#/doc/numeric/random/cauchy_distribution>)(C++11) | produz valores reais em uma [distribuição de Cauchy](<https://en.wikipedia.org/wiki/Cauchy_distribution> "enwiki:Cauchy distribution")
(template de classe)
[ fisher_f_distribution](<#/doc/numeric/random/fisher_f_distribution>)(C++11) | produz valores reais em uma [distribuição F de Fisher](<https://en.wikipedia.org/wiki/F-distribution> "enwiki:F-distribution")
(template de classe)
[ student_t_distribution](<#/doc/numeric/random/student_t_distribution>)(C++11) | produz valores reais em uma [distribuição t de Student](<https://en.wikipedia.org/wiki/Student%27s_t-distribution> "enwiki:Student's t-distribution")
(template de classe)

##### Distribuições de amostragem

[ discrete_distribution](<#/doc/numeric/random/discrete_distribution>)(C++11) | produz valores inteiros em uma distribuição discreta
(template de classe)
[ piecewise_constant_distribution](<#/doc/numeric/random/piecewise_constant_distribution>)(C++11) | produz valores reais distribuídos em subintervalos constantes
(template de classe)
[ piecewise_linear_distribution](<#/doc/numeric/random/piecewise_linear_distribution>)(C++11) | produz valores reais distribuídos em subintervalos definidos
(template de classe)

##### Utilitários

[ seed_seq](<#/doc/numeric/random/seed_seq>)(C++11) | gerador de sequência de sementes embaralhadas de propósito geral que elimina viés
(classe)

### Funções

[ generate_canonical](<#/doc/numeric/random/generate_canonical>)(C++11) | distribui uniformemente valores reais de uma dada precisão em `[0, 1)`
(template de função)
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) | preenche um range com números aleatórios de um gerador de bits aleatórios uniforme
(objeto de função de algoritmo)

### Sinopse
```cpp
    #include <initializer_list>
    
    namespace std {
      // requisitos de gerador de bits aleatórios uniformes
      template<class G>
      concept uniform_random_bit_generator = /* see description */;
    
      // template de classe linear_congruential_engine
      template<class UIntType, UIntType a, UIntType c, UIntType m>
      class linear_congruential_engine;
    
      // template de classe mersenne_twister_engine
      template<class UIntType,
               size_t w,
               size_t n,
               size_t m,
               size_t r,
               UIntType a,
               size_t u,
               UIntType d,
               size_t s,
               UIntType b,
               size_t t,
               UIntType c,
               size_t l,
               UIntType f>
      class mersenne_twister_engine;
    
      // template de classe subtract_with_carry_engine
      template<class UIntType, size_t w, size_t s, size_t r>
      class subtract_with_carry_engine;
    
      // template de classe discard_block_engine
      template<class Engine, size_t p, size_t r>
      class discard_block_engine;
    
      // template de classe independent_bits_engine
      template<class Engine, size_t w, class UIntType>
      class independent_bits_engine;
    
      // template de classe shuffle_order_engine
      template<class Engine, size_t k>
      class shuffle_order_engine;
    
      // template de classe philox_engine
      template<class UIntType, size_t w, size_t n, size_t r, UIntType... consts>
      class philox_engine;
    
      // engines e adaptadores de engine com parâmetros predefinidos
      using minstd_rand0          = /* veja a descrição */;
      using minstd_rand           = /* veja a descrição */;
      using mt19937               = /* veja a descrição */;
      using mt19937_64            = /* veja a descrição */;
      using ranlux24_base         = /* veja a descrição */;
      using ranlux48_base         = /* veja a descrição */;
      using ranlux24              = /* veja a descrição */;
      using ranlux48              = /* veja a descrição */;
      using knuth_b               = /* veja a descrição */;
      using philox4x32            = /* veja a descrição */;
      using philox4x64            = /* veja a descrição */;
    
      using default_random_engine = /* veja a descrição */;
    
      // classe random_device
      class random_device;
    
      // classe seed_seq
      class seed_seq;
    
      // template de função generate_canonical
      template<class RealType, size_t digits, class URBG>
      RealType generate_canonical(URBG& g);
    
      namespace ranges {
        // generate_random
        template<class R, class G>
          requires output_range<R, invoke_result_t<G&>> &&
                   uniform_random_bit_generator<remove_cvref_t<G>>
        constexpr borrowed_iterator_t<R> generate_random(R&& r, G&& g);
    
        template<class G, output_iterator<invoke_result_t<G&>> O, sentinel_for<O> S>
          requires uniform_random_bit_generator<remove_cvref_t<G>>
        constexpr O generate_random(O first, S last, G&& g);
    
        template<class R, class G, class D>
          requires output_range<R, invoke_result_t<D&, G&>> && invocable<D&, G&> &&
                   uniform_random_bit_generator<remove_cvref_t<G>>
        constexpr borrowed_iterator_t<R> generate_random(R&& r, G&& g, D&& d);
    
        template<class G,
                 class D,
                 output_iterator<invoke_result_t<D&, G&>> O,
                 sentinel_for<O> S>
          requires invocable<D&, G&> && uniform_random_bit_generator<remove_cvref_t<G>>
        constexpr O generate_random(O first, S last, G&& g, D&& d);
      }
    
      // template de classe uniform_int_distribution
      template<class IntType = int>
      class uniform_int_distribution;
    
      // template de classe uniform_real_distribution
      template<class RealType = double>
      class uniform_real_distribution;
    
      // classe bernoulli_distribution
      class bernoulli_distribution;
    
      // template de classe binomial_distribution
      template<class IntType = int>
      class binomial_distribution;
    
      // template de classe geometric_distribution
      template<class IntType = int>
      class geometric_distribution;
    
      // template de classe negative_binomial_distribution
      template<class IntType = int>
      class negative_binomial_distribution;
    
      // template de classe poisson_distribution
      template<class IntType = int>
      class poisson_distribution;
    
      // template de classe exponential_distribution
      template<class RealType = double>
      class exponential_distribution;
    
      // template de classe gamma_distribution
      template<class RealType = double>
      class gamma_distribution;
    
      // template de classe weibull_distribution
      template<class RealType = double>
      class weibull_distribution;
    
      // template de classe extreme_value_distribution
      template<class RealType = double>
      class extreme_value_distribution;
    
      // template de classe normal_distribution
      template<class RealType = double>
      class normal_distribution;
    
      // template de classe lognormal_distribution
      template<class RealType = double>
      class lognormal_distribution;
    
      // template de classe chi_squared_distribution
      template<class RealType = double>
      class chi_squared_distribution;
    
      // template de classe cauchy_distribution
      template<class RealType = double>
      class cauchy_distribution;
    
      // template de classe fisher_f_distribution
      template<class RealType = double>
      class fisher_f_distribution;
    
      // template de classe student_t_distribution
      template<class RealType = double>
      class student_t_distribution;
    
      // template de classe discrete_distribution
      template<class IntType = int>
      class discrete_distribution;
    
      // template de classe piecewise_constant_distribution
      template<class RealType = double>
      class piecewise_constant_distribution;
    
      // template de classe piecewise_linear_distribution
      template<class RealType = double>
      class piecewise_linear_distribution;
    }
```

#### Concept [uniform_random_bit_generator](<#/doc/numeric/random/UniformRandomBitGenerator>)
```cpp
    namespace std {
      template<class G>
      concept uniform_random_bit_generator =
        invocable<G&> && unsigned_integral<invoke_result_t<G&>> && requires {
          {
            G::min()
          } -> same_as<invoke_result_t<G&>>;
          {
            G::max()
          } -> same_as<invoke_result_t<G&>>;
          requires bool_constant<(G::min() < G::max())>::value;
        };
    }
```

#### Template de classe [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)
```cpp
    namespace std {
      template<class UIntType, UIntType a, UIntType c, UIntType m>
      class linear_congruential_engine
      {
      public:
        // tipos
        using result_type = UIntType;
    
        // características do engine
        static constexpr result_type multiplier = a;
        static constexpr result_type increment  = c;
        static constexpr result_type modulus    = m;
        static constexpr result_type min() { return c == 0u ? 1u : 0u; }
        static constexpr result_type max() { return m - 1u; }
        static constexpr result_type default_seed = 1u;
    
        // construtores e funções de semeadura
        linear_congruential_engine()
          : linear_congruential_engine(default_seed)
        {
        }
        explicit linear_congruential_engine(result_type s);
        template<class Sseq>
        explicit linear_congruential_engine(Sseq& q);
        void seed(result_type s = default_seed);
        template<class Sseq>
        void seed(Sseq& q);
    
        // operadores de igualdade
        friend bool operator==(const linear_congruential_engine& x,
                               const linear_congruential_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const linear_congruential_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        linear_congruential_engine& x);
      };
    }
```

#### Template de classe [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)
```cpp
    namespace std {
      template<class UIntType,
               size_t w,
               size_t n,
               size_t m,
               size_t r,
               UIntType a,
               size_t u,
               UIntType d,
               size_t s,
               UIntType b,
               size_t t,
               UIntType c,
               size_t l,
               UIntType f>
      class mersenne_twister_engine
      {
      public:
        // tipos
        using result_type = UIntType;
    
        // características do engine
        static constexpr size_t word_size                   = w;
        static constexpr size_t state_size                  = n;
        static constexpr size_t shift_size                  = m;
        static constexpr size_t mask_bits                   = r;
        static constexpr UIntType xor_mask                  = a;
        static constexpr size_t tempering_u                 = u;
        static constexpr UIntType tempering_d               = d;
        static constexpr size_t tempering_s                 = s;
        static constexpr UIntType tempering_b               = b;
        static constexpr size_t tempering_t                 = t;
        static constexpr UIntType tempering_c               = c;
        static constexpr size_t tempering_l                 = l;
        static constexpr UIntType initialization_multiplier = f;
        static constexpr result_type min() { return 0; }
        static constexpr result_type max() { return /*2^w - 1*/; }
        static constexpr result_type default_seed = 5489u;
    
        // construtores e funções de semeadura
        mersenne_twister_engine()
          : mersenne_twister_engine(default_seed)
        {
        }
        explicit mersenne_twister_engine(result_type value);
        template<class Sseq>
        explicit mersenne_twister_engine(Sseq& q);
        void seed(result_type value = default_seed);
        template<class Sseq>
        void seed(Sseq& q);
    
        // operadores de igualdade
        friend bool operator==(const mersenne_twister_engine& x,
                               const mersenne_twister_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const mersenne_twister_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        mersenne_twister_engine& x);
      };
    }
```

#### Template de classe [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)
```cpp
    namespace std {
      template<class UIntType, size_t w, size_t s, size_t r>
      class subtract_with_carry_engine
      {
      public:
        // tipos
        using result_type = UIntType;
    
        // características do engine
        static constexpr size_t word_size = w;
        static constexpr size_t short_lag = s;
        static constexpr size_t long_lag  = r;
        static constexpr result_type min() { return 0; }
        static constexpr result_type max() { return /*m - 1*/; }
        static constexpr uint_least32_t default_seed = 19780503u;
    
        // construtores e funções de semeadura
        subtract_with_carry_engine()
          : subtract_with_carry_engine(0u)
        {
        }
        explicit subtract_with_carry_engine(result_type value);
        template<class Sseq>
        explicit subtract_with_carry_engine(Sseq& q);
        void seed(result_type value = 0u);
        template<class Sseq>
        void seed(Sseq& q);
    
        // operadores de igualdade
        friend bool operator==(const subtract_with_carry_engine& x,
                               const subtract_with_carry_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const subtract_with_carry_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        subtract_with_carry_engine& x);
      };
    }
```

#### Template de classe std::philox_engine
```cpp
    namespace std {
      template<class UIntType, size_t w, size_t n, size_t r, UIntType... consts>
      class philox_engine
      {
        static constexpr size_t /*array-size*/ = n / 2; // exposition only
      public:
        // tipos
        using result_type = UIntType;
    
        // características do engine
        static constexpr size_t word_size   = w;
        static constexpr size_t word_count  = n;
        static constexpr size_t round_count = r;
        static constexpr array<result_type, /*array-size*/> multipliers;
        static constexpr array < result_type, @exposition onlyid { array - size > }
        @round_consts;
        static constexpr result_type min() { return 0; }
        static constexpr result_type max() { return m - 1; }
        static constexpr result_type default_seed = 20111115u;
    
        // construtores e funções de semeadura
        philox_engine()
          : philox_engine(default_seed)
        {
        }
        explicit philox_engine(result_type value);
        template<class Sseq>
        explicit philox_engine(Sseq& q);
        void seed(result_type value = default_seed);
        template<class Sseq>
        void seed(Sseq& q);
    
        void set_counter(const array<result_type, n>& counter);
    
        // operadores de igualdade
        friend bool operator==(const philox_engine& x, const philox_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const philox_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        philox_engine& x);
      };
    }
```

#### Template de classe [std::discard_block_engine](<#/doc/numeric/random/discard_block_engine>)
```cpp
    namespace std {
      template<class Engine, size_t p, size_t r>
      class discard_block_engine
      {
      public:
        // tipos
        using result_type = typename Engine::result_type;
    
        // características do engine
        static constexpr size_t block_size = p;
        static constexpr size_t used_block = r;
        static constexpr result_type min() { return Engine::min(); }
        static constexpr result_type max() { return Engine::max(); }
    
        // construtores e funções de semeadura
        discard_block_engine();
        explicit discard_block_engine(const Engine& e);
        explicit discard_block_engine(Engine&& e);
        explicit discard_block_engine(result_type s);
        template<class Sseq>
        explicit discard_block_engine(Sseq& q);
        void seed();
        void seed(result_type s);
        template<class Sseq>
        void seed(Sseq& q);
    
        // operadores de igualdade
        friend bool operator==(const discard_block_engine& x, const discard_block_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // funções de propriedade
        const Engine& base() const noexcept { return e; }
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const discard_block_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        discard_block_engine& x);
    
      private:
        Engine e; // exposition only
        size_t n; // exposition only
      };
    }
```

#### Template de classe [std::independent_bits_engine](<#/doc/numeric/random/independent_bits_engine>)
```cpp
    namespace std {
      template<class Engine, size_t w, class UIntType>
      class independent_bits_engine
      {
      public:
        // tipos
        using result_type = UIntType;
    
        // características do engine
        static constexpr result_type min() { return 0; }
        static constexpr result_type max() { return /*2^w - 1*/; }
    
        // construtores e funções de semeadura
        independent_bits_engine();
        explicit independent_bits_engine(const Engine& e);
        explicit independent_bits_engine(Engine&& e);
        explicit independent_bits_engine(result_type s);
        template<class Sseq>
        explicit independent_bits_engine(Sseq& q);
        void seed();
        void seed(result_type s);
        template<class Sseq>
        void seed(Sseq& q);
    
        // operadores de igualdade
        friend bool operator==(const independent_bits_engine& x,
                               const independent_bits_engine& y);
    
        // funções de geração
        result_type operator()();
        void discard(unsigned long long z);
    
        // funções de propriedade
        const Engine& base() const noexcept { return e; }
    
        // inserters e extractors
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const independent_bits_engine& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        independent_bits_engine& x);
    
      private:
        Engine e; // exposition only
      };
    }
```

#### Template de classe [std::shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)
```cpp
    namespace std {
      template<class Engine, size_t k>
      class shuffle_order_engine
      {
      public:
        // tipos
        using result_type = typename Engine::result_type;
    
        // características do engine
        static constexpr size_t table_size = k;
        static constexpr result_type min() { return Engine::min(); }
        static constexpr result_type max() { return Engine::max(); }
    
        // construtores e funções de semeadura
        shuffle_order_engine();
        explicit shuffle_order_engine(const Engine& e);
        explicit shuffle_order_engine(Engine&& e);
        explicit shuffle_order_engine(result_type s);
        template<class Sseq>
        explicit shuffle_order_engine(Sseq& q);
        void seed();
```
```cpp
    void seed(result_type s);
    template<class Sseq>
    void seed(Sseq& q);
 
    // operadores de igualdade
    friend bool operator==(const shuffle_order_engine& x, const shuffle_order_engine& y);
 
    // funções de geração
    result_type operator()();
    void discard(unsigned long long z);
 
    // funções de propriedade
    const Engine& base() const noexcept { return e; }
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const shuffle_order_engine& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    shuffle_order_engine& x);
 
  private:
    Engine e;         // apenas para exposição
    result_type V[k]; // apenas para exposição
    result_type Y;    // apenas para exposição
  };
}
```

#### Engines e adaptadores de engine com parâmetros predefinidos
```cpp
namespace std {
using minstd_rand0 = linear_congruential_engine<uint_fast32_t, 16'807, 0, 2'147'483'647>;
using minstd_rand = linear_congruential_engine<uint_fast32_t, 48'271, 0, 2'147'483'647>;
using mt19937 = mersenne_twister_engine<uint_fast32_t,
                                        32,
                                        624,
                                        397,
                                        31,
                                        0x9908'b0df,
                                        11,
                                        0xffff'ffff,
                                        7,
                                        0x9d2c'5680,
                                        15,
                                        0xefc6'0000,
                                        18,
                                        1'812'433'253>; //'
using mt19937_64 = mersenne_twister_engine<uint_fast64_t,
                                           64,
                                           312,
                                           156,
                                           31,
                                           0xb502'6f5a'a966'19e9,
                                           29,
                                           0x5555'5555'5555'5555,
                                           17,
                                           0x71d6'7fff'eda6'0000,
                                           37,
                                           0xfff7'eee0'0000'0000,
                                           43,
                                           6'364'136'223'846'793'005>;
using ranlux24_base = subtract_with_carry_engine<uint_fast32_t, 24, 10, 24>;
using ranlux48_base = subtract_with_carry_engine<uint_fast64_t, 48, 5, 12>;
using ranlux24 = discard_block_engine<ranlux24_base, 223, 23>;
using ranlux48 = discard_block_engine<ranlux48_base, 389, 11>;
using knuth_b = shuffle_order_engine<minstd_rand0, 256>;
using default_random_engine = /* implementation-defined */;
using philox4x32 = philox_engine<uint_fast32_t,
                                 32,
                                 4,
                                 10,
                                 0xD2511F53,
                                 0x9E3779B9,
                                 0xCD9E8D57,
                                 0xBB67AE85>;
using philox4x64 = philox_engine<uint_fast64_t,
                                 64,
                                 4,
                                 10,
                                 0xD2E7470EE14C6C93,
                                 0x9E3779B97F4A7C15,
                                 0xCA5A826395121157,
                                 0xBB67AE8584CAA73B>;
}
```

#### Classe [std::random_device](<#/doc/numeric/random/random_device>)
```cpp
namespace std {
  class random_device
  {
  public:
    // tipos
    using result_type = unsigned int;
 
    // características do gerador
    static constexpr result_type min() { return numeric_limits<result_type>::min(); }
    static constexpr result_type max() { return numeric_limits<result_type>::max(); }
 
    // construtores
    random_device()
      : random_device(/* definido pela implementação */)
    {
    }
    explicit random_device(const string& token);
 
    // funções de geração
    result_type operator()();
 
    // funções de propriedade
    double entropy() const noexcept;
 
    // sem funções de cópia
    random_device(const random_device&)  = delete;
    void operator=(const random_device&) = delete;
  };
}
```

#### Classe [std::seed_seq](<#/doc/numeric/random/seed_seq>)
```cpp
namespace std {
  class seed_seq
  {
  public:
    // tipos
    using result_type = uint_least32_t;
 
    // construtores
    seed_seq() noexcept;
    template<class T>
    seed_seq(initializer_list<T> il);
    template<class InputIter>
    seed_seq(InputIter begin, InputIter end);
 
    // funções de geração
    template<class RandomAccessIter>
    void generate(RandomAccessIter begin, RandomAccessIter end);
 
    // funções de propriedade
    size_t size() const noexcept;
    template<class OutputIter>
    void param(OutputIter dest) const;
 
    // sem funções de cópia
    seed_seq(const seed_seq&)       = delete;
    void operator=(const seed_seq&) = delete;
 
  private:
    vector<result_type> v; // apenas para exposição
  };
}
```

#### Modelo de classe [std::uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)
```cpp
namespace std {
  template<class IntType = int>
  class uniform_int_distribution
  {
  public:
    // tipos
    using result_type = IntType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    uniform_int_distribution()
      : uniform_int_distribution(0)
    {
    }
    explicit uniform_int_distribution(IntType a,
                                      IntType b = numeric_limits<IntType>::max());
    explicit uniform_int_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const uniform_int_distribution& x,
                           const uniform_int_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    result_type a() const;
    result_type b() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const uniform_int_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    uniform_int_distribution& x);
  };
}
```

#### Modelo de classe [std::uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class uniform_real_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    uniform_real_distribution()
      : uniform_real_distribution(0.0)
    {
    }
    explicit uniform_real_distribution(RealType a, RealType b = 1.0);
    explicit uniform_real_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const uniform_real_distribution& x,
                           const uniform_real_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    result_type a() const;
    result_type b() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const uniform_real_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    uniform_real_distribution& x);
  };
}
```

#### Classe [std::bernoulli_distribution](<#/doc/numeric/random/bernoulli_distribution>)
```cpp
namespace std {
  class bernoulli_distribution
  {
  public:
    // tipos
    using result_type = bool;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    bernoulli_distribution()
      : bernoulli_distribution(0.5)
    {
    }
    explicit bernoulli_distribution(double p);
    explicit bernoulli_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const bernoulli_distribution& x,
                           const bernoulli_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    double p() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const bernoulli_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    bernoulli_distribution& x);
  };
}
```

#### Modelo de classe [std::binomial_distribution](<#/doc/numeric/random/binomial_distribution>)
```cpp
namespace std {
  template<class IntType = int>
  class binomial_distribution
  {
  public:
    // tipos
    using result_type = IntType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    binomial_distribution()
      : binomial_distribution(1)
    {
    }
    explicit binomial_distribution(IntType t, double p = 0.5);
    explicit binomial_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const binomial_distribution& x,
                           const binomial_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    IntType t() const;
    double p() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const binomial_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    binomial_distribution& x);
  };
}
```

#### Modelo de classe [std::geometric_distribution](<#/doc/numeric/random/geometric_distribution>)
```cpp
namespace std {
  template<class IntType = int>
  class geometric_distribution
  {
  public:
    // tipos
    using result_type = IntType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    geometric_distribution()
      : geometric_distribution(0.5)
    {
    }
    explicit geometric_distribution(double p);
    explicit geometric_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const geometric_distribution& x,
                           const geometric_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    double p() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const geometric_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    geometric_distribution& x);
  };
}
```

#### Modelo de classe [std::negative_binomial_distribution](<#/doc/numeric/random/negative_binomial_distribution>)
```cpp
namespace std {
  template<class IntType = int>
  class negative_binomial_distribution
  {
  public:
    // tipos
    using result_type = IntType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    negative_binomial_distribution()
      : negative_binomial_distribution(1)
    {
    }
    explicit negative_binomial_distribution(IntType k, double p = 0.5);
    explicit negative_binomial_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const negative_binomial_distribution& x,
                           const negative_binomial_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    IntType k() const;
    double p() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(
      basic_ostream<CharT, Traits>& os,
      const negative_binomial_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    negative_binomial_distribution& x);
  };
}
```

#### Modelo de classe [std::poisson_distribution](<#/doc/numeric/random/poisson_distribution>)
```cpp
namespace std {
  template<class IntType = int>
  class poisson_distribution
  {
  public:
    // tipos
    using result_type = IntType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    poisson_distribution()
      : poisson_distribution(1.0)
    {
    }
    explicit poisson_distribution(double mean);
    explicit poisson_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const poisson_distribution& x, const poisson_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    double mean() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const poisson_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    poisson_distribution& x);
  };
}
```

#### Modelo de classe [std::exponential_distribution](<#/doc/numeric/random/exponential_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class exponential_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    exponential_distribution()
      : exponential_distribution(1.0)
    {
    }
    explicit exponential_distribution(RealType lambda);
    explicit exponential_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const exponential_distribution& x,
                           const exponential_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType lambda() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const exponential_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    exponential_distribution& x);
  };
}
```

#### Modelo de classe [std::gamma_distribution](<#/doc/numeric/random/gamma_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class gamma_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    gamma_distribution()
      : gamma_distribution(1.0)
    {
    }
    explicit gamma_distribution(RealType alpha, RealType beta = 1.0);
    explicit gamma_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const gamma_distribution& x, const gamma_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType alpha() const;
    RealType beta() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const gamma_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    gamma_distribution& x);
  };
}
```

#### Modelo de classe [std::weibull_distribution](<#/doc/numeric/random/weibull_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class weibull_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    weibull_distribution()
      : weibull_distribution(1.0)
    {
    }
    explicit weibull_distribution(RealType a, RealType b = 1.0);
    explicit weibull_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const weibull_distribution& x, const weibull_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType a() const;
    RealType b() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const weibull_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    weibull_distribution& x);
  };
}
```

#### Modelo de classe [std::extreme_value_distribution](<#/doc/numeric/random/extreme_value_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class extreme_value_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    extreme_value_distribution()
      : extreme_value_distribution(0.0)
    {
    }
    explicit extreme_value_distribution(RealType a, RealType b = 1.0);
    explicit extreme_value_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const extreme_value_distribution& x,
                           const extreme_value_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType a() const;
    RealType b() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const extreme_value_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    extreme_value_distribution& x);
  };
}
```

#### Modelo de classe [std::normal_distribution](<#/doc/numeric/random/normal_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class normal_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtores e funções de reset
    normal_distribution()
      : normal_distribution(0.0)
    {
    }
    explicit normal_distribution(RealType mean, RealType stddev = 1.0);
    explicit normal_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const normal_distribution& x, const normal_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType mean() const;
    RealType stddev() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const normal_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    normal_distribution& x);
  };
}
```

#### Modelo de classe [std::lognormal_distribution](<#/doc/numeric/random/lognormal_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class lognormal_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    lognormal_distribution()
      : lognormal_distribution(0.0)
    {
    }
    explicit lognormal_distribution(RealType m, RealType s = 1.0);
    explicit lognormal_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const lognormal_distribution& x,
                           const lognormal_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType m() const;
    RealType s() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const lognormal_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    lognormal_distribution& x);
  };
}
```

#### Modelo de classe [std::chi_squared_distribution](<#/doc/numeric/random/chi_squared_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class chi_squared_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    chi_squared_distribution()
      : chi_squared_distribution(1.0)
    {
    }
    explicit chi_squared_distribution(RealType n);
    explicit chi_squared_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const chi_squared_distribution& x,
                           const chi_squared_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType n() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const chi_squared_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    chi_squared_distribution& x);
  };
}
```

#### Modelo de classe [std::cauchy_distribution](<#/doc/numeric/random/cauchy_distribution>)
```cpp
namespace std {
  template<class RealType = double>
  class cauchy_distribution
  {
  public:
    // tipos
    using result_type = RealType;
    using param_type  = /* não especificado */;
 
    // construtor e funções de reset
    cauchy_distribution()
      : cauchy_distribution(0.0)
    {
    }
    explicit cauchy_distribution(RealType a, RealType b = 1.0);
    explicit cauchy_distribution(const param_type& parm);
    void reset();
 
    // operadores de igualdade
    friend bool operator==(const cauchy_distribution& x, const cauchy_distribution& y);
 
    // funções de geração
    template<class URBG>
    result_type operator()(URBG& g);
    template<class URBG>
    result_type operator()(URBG& g, const param_type& parm);
 
    // funções de propriedade
    RealType a() const;
    RealType b() const;
    param_type param() const;
    void param(const param_type& parm);
    result_type min() const;
    result_type max() const;
 
    // inseridores e extratores
    template<class CharT, class Traits>
    friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                    const cauchy_distribution& x);
    template<class CharT, class Traits>
    friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                    cauchy_distribution& x);
  };
}
```
      };
    }
```

#### Modelo de classe std::fisher_f_distribution
```
    namespace std {
      template<class RealType = double>
      class fisher_f_distribution
      {
      public:
        // tipos
        using result_type = RealType;
        using param_type  = /* unspecified */;
     
        // funções de construtor e reset
        fisher_f_distribution()
          : fisher_f_distribution(1.0)
        {
        }
        explicit fisher_f_distribution(RealType m, RealType n = 1.0);
        explicit fisher_f_distribution(const param_type& parm);
        void reset();
     
        // operadores de igualdade
        friend bool operator==(const fisher_f_distribution& x,
                               const fisher_f_distribution& y);
     
        // funções de geração
        template<class URBG>
        result_type operator()(URBG& g);
        template<class URBG>
        result_type operator()(URBG& g, const param_type& parm);
     
        // funções de propriedade
        RealType m() const;
        RealType n() const;
        param_type param() const;
        void param(const param_type& parm);
        result_type min() const;
        result_type max() const;
     
        // inseridores e extratores
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const fisher_f_distribution& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        fisher_f_distribution& x);
      };
    }
```

#### Modelo de classe std::student_t_distribution
```
    namespace std {
      template<class RealType = double>
      class student_t_distribution
      {
      public:
        // tipos
        using result_type = RealType;
        using param_type  = /* unspecified */;
     
        // funções de construtor e reset
        student_t_distribution()
          : student_t_distribution(1.0)
        {
        }
        explicit student_t_distribution(RealType n);
        explicit student_t_distribution(const param_type& parm);
        void reset();
     
        // operadores de igualdade
        friend bool operator==(const student_t_distribution& x,
                               const student_t_distribution& y);
     
        // funções de geração
        template<class URBG>
        result_type operator()(URBG& g);
        template<class URBG>
        result_type operator()(URBG& g, const param_type& parm);
     
        // funções de propriedade
        RealType n() const;
        param_type param() const;
        void param(const param_type& parm);
        result_type min() const;
        result_type max() const;
     
        // inseridores e extratores
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const student_t_distribution& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        student_t_distribution& x);
      };
    }
```

#### Modelo de classe std::discrete_distribution
```
    namespace std {
      template<class IntType = int>
      class discrete_distribution
      {
      public:
        // tipos
        using result_type = IntType;
        using param_type  = /* unspecified */;
     
        // funções de construtor e reset
        discrete_distribution();
        template<class InputIter>
        discrete_distribution(InputIter firstW, InputIter lastW);
        discrete_distribution(initializer_list<double> wl);
        template<class UnaryOperation>
        discrete_distribution(size_t nw, double xmin, double xmax, UnaryOperation fw);
        explicit discrete_distribution(const param_type& parm);
        void reset();
     
        // operadores de igualdade
        friend bool operator==(const discrete_distribution& x,
                               const discrete_distribution& y);
     
        // funções de geração
        template<class URBG>
        result_type operator()(URBG& g);
        template<class URBG>
        result_type operator()(URBG& g, const param_type& parm);
     
        // funções de propriedade
        vector<double> probabilities() const;
        param_type param() const;
        void param(const param_type& parm);
        result_type min() const;
        result_type max() const;
     
        // inseridores e extratores
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& os,
                                                        const discrete_distribution& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        discrete_distribution& x);
      };
    }
```

#### Modelo de classe std::piecewise_constant_distribution
```
    namespace std {
      template<class RealType = double>
      class piecewise_constant_distribution
      {
      public:
        // tipos
        using result_type = RealType;
        using param_type  = /* unspecified */;
     
        // funções de construtor e reset
        piecewise_constant_distribution();
        template<class InputIterB, class InputIterW>
        piecewise_constant_distribution(InputIterB firstB,
                                        InputIterB lastB,
                                        InputIterW firstW);
        template<class UnaryOperation>
        piecewise_constant_distribution(initializer_list<RealType> bl, UnaryOperation fw);
        template<class UnaryOperation>
        piecewise_constant_distribution(size_t nw,
                                        RealType xmin,
                                        RealType xmax,
                                        UnaryOperation fw);
        explicit piecewise_constant_distribution(const param_type& parm);
        void reset();
     
        // operadores de igualdade
        friend bool operator==(const piecewise_constant_distribution& x,
                               const piecewise_constant_distribution& y);
     
        // funções de geração
        template<class URBG>
        result_type operator()(URBG& g);
        template<class URBG>
        result_type operator()(URBG& g, const param_type& parm);
     
        // funções de propriedade
        vector<result_type> intervals() const;
        vector<result_type> densities() const;
        param_type param() const;
        void param(const param_type& parm);
        result_type min() const;
        result_type max() const;
     
        // inseridores e extratores
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(
          basic_ostream<CharT, Traits>& os,
          const piecewise_constant_distribution& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        piecewise_constant_distribution& x);
      };
    }
```

#### Modelo de classe std::piecewise_linear_distribution
```
    namespace std {
      template<class RealType = double>
      class piecewise_linear_distribution
      {
      public:
        // tipos
        using result_type = RealType;
        using param_type  = /* unspecified */;
     
        // funções de construtor e reset
        piecewise_linear_distribution();
        template<class InputIterB, class InputIterW>
        piecewise_linear_distribution(InputIterB firstB, InputIterB lastB, InputIterW firstW);
        template<class UnaryOperation>
        piecewise_linear_distribution(initializer_list<RealType> bl, UnaryOperation fw);
        template<class UnaryOperation>
        piecewise_linear_distribution(size_t nw,
                                      RealType xmin,
                                      RealType xmax,
                                      UnaryOperation fw);
        explicit piecewise_linear_distribution(const param_type& parm);
        void reset();
     
        // operadores de igualdade
        friend bool operator==(const piecewise_linear_distribution& x,
                               const piecewise_linear_distribution& y);
     
        // funções de geração
        template<class URBG>
        result_type operator()(URBG& g);
        template<class URBG>
        result_type operator()(URBG& g, const param_type& parm);
     
        // funções de propriedade
        vector<result_type> intervals() const;
        vector<result_type> densities() const;
        param_type param() const;
        void param(const param_type& parm);
        result_type min() const;
        result_type max() const;
     
        // inseridores e extratores
        template<class CharT, class Traits>
        friend basic_ostream<CharT, Traits>& operator<<(
          basic_ostream<CharT, Traits>& os,
          const piecewise_linear_distribution& x);
        template<class CharT, class Traits>
        friend basic_istream<CharT, Traits>& operator>>(basic_istream<CharT, Traits>& is,
                                                        piecewise_linear_distribution& x);
      };
    }