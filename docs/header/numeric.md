# Cabeçalho da biblioteca padrão &lt;numeric&gt;

Este cabeçalho faz parte da biblioteca [numeric](<#/doc/numeric>).

### Funções

---
[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(modelo de função)
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou agrega um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto que fora de ordem
(modelo de função)
[ transform_reduce](<#/doc/algorithm/transform_reduce>)(C++17) | aplica um invocável, então reduz fora de ordem
(modelo de função)
[ inner_product](<#/doc/algorithm/inner_product>) | calcula o produto interno de dois ranges de elementos
(modelo de função)
[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ inclusive_scan](<#/doc/algorithm/inclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), inclui o i-ésimo elemento de entrada na i-ésima soma
(modelo de função)
[ exclusive_scan](<#/doc/algorithm/exclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), exclui o i-ésimo elemento de entrada da i-ésima soma
(modelo de função)
[ transform_inclusive_scan](<#/doc/algorithm/transform_inclusive_scan>)(C++17) | aplica um invocável, então calcula o scan inclusivo
(modelo de função)
[ transform_exclusive_scan](<#/doc/algorithm/transform_exclusive_scan>)(C++17) | aplica um invocável, então calcula o scan exclusivo
(modelo de função)
[ gcd](<#/doc/numeric/gcd>)(C++17) | calcula o máximo divisor comum de dois inteiros
(modelo de função)
[ lcm](<#/doc/numeric/lcm>)(C++17) | calcula o mínimo múltiplo comum de dois inteiros
(modelo de função)
[ midpoint](<#/doc/numeric/midpoint>)(C++20) | ponto médio entre dois números ou ponteiros
(modelo de função)
[ add_sat](<#/doc/numeric/add_sat>)(C++26) | operação de adição com saturação em dois inteiros
(modelo de função)
[ sub_sat](<#/doc/numeric/sub_sat>)(C++26) | operação de subtração com saturação em dois inteiros
(modelo de função)
[ mul_sat](<#/doc/numeric/mul_sat>)(C++26) | operação de multiplicação com saturação em dois inteiros
(modelo de função)
[ div_sat](<#/doc/numeric/div_sat>)(C++26) | operação de divisão com saturação em dois inteiros
(modelo de função)
[ saturate_cast](<#/doc/numeric/saturate_cast>)(C++26) | retorna um valor inteiro limitado ao range de outro tipo inteiro
(modelo de função)

### Sinopse
```cpp
    namespace std {
      // accumulate
      template<class InputIt, class T>
        constexpr T accumulate(InputIt first, InputIt last, T init);
      template<class InputIt, class T, class BinaryOperation>
        constexpr T accumulate(InputIt first, InputIt last, T init, BinaryOperation binary_op);
    
      // reduce
      template<class InputIt>
        constexpr typename iterator_traits<InputIt>::value_type
          reduce(InputIt first, InputIt last);
      template<class InputIt, class T>
        constexpr T reduce(InputIt first, InputIt last, T init);
      template<class InputIt, class T, class BinaryOperation>
        constexpr T reduce(InputIt first, InputIt last, T init, BinaryOperation binary_op);
      template<class ExecutionPolicy, class ForwardIt>
        typename iterator_traits<ForwardIt>::value_type
          reduce(ExecutionPolicy&& exec,
                 ForwardIt first, ForwardIt last);
      template<class ExecutionPolicy, class ForwardIt, class T>
        T reduce(ExecutionPolicy&& exec,
                 ForwardIt first, ForwardIt last, T init);
      template<class ExecutionPolicy, class ForwardIt, class T, class BinaryOperation>
        T reduce(ExecutionPolicy&& exec,
                 ForwardIt first, ForwardIt last, T init, BinaryOperation binary_op);
    
      // inner product
      template<class InputIt1, class InputIt2, class T>
        constexpr T inner_product(InputIt1 first1, InputIt1 last1,
                                  InputIt2 first2, T init);
      template<class InputIt1, class InputIt2, class T,
               class BinaryOperation1, class BinaryOperation2>
        constexpr T inner_product(InputIt1 first1, InputIt1 last1,
                                  InputIt2 first2, T init,
                                  BinaryOperation1 binary_op1,
                                  BinaryOperation2 binary_op2);
    
      // transform reduce
      template<class InputIt1, class InputIt2, class T>
        constexpr T transform_reduce(InputIt1 first1, InputIt1 last1,
                                     InputIt2 first2,
                                     T init);
      template<class InputIt1, class InputIt2, class T,
               class BinaryOperation1, class BinaryOperation2>
        constexpr T transform_reduce(InputIt1 first1, InputIt1 last1,
                                     InputIt2 first2,
                                     T init,
                                     BinaryOperation1 binary_op1,
                                     BinaryOperation2 binary_op2);
      template<class InputIt, class T,
               class BinaryOperation, class UnaryOperation>
        constexpr T transform_reduce(InputIt first, InputIt last,
                                     T init,
                                     BinaryOperation binary_op, UnaryOperation unary_op);
      template<class ExecutionPolicy,
               class ForwardIt1, class ForwardIt2, class T>
        T transform_reduce(ExecutionPolicy&& exec,
                           ForwardIt1 first1, ForwardIt1 last1,
                           ForwardIt2 first2,
                           T init);
      template<class ExecutionPolicy,
               class ForwardIt1, class ForwardIt2, class T,
               class BinaryOperation1, class BinaryOperation2>
        T transform_reduce(ExecutionPolicy&& exec,
                           ForwardIt1 first1, ForwardIt1 last1,
                           ForwardIt2 first2,
                           T init,
                           BinaryOperation1 binary_op1,
                           BinaryOperation2 binary_op2);
      template<class ExecutionPolicy,
               class ForwardIt, class T,
               class BinaryOperation, class UnaryOperation>
        T transform_reduce(ExecutionPolicy&& exec,
                           ForwardIt first, ForwardIt last,
                           T init,
                           BinaryOperation binary_op, UnaryOperation unary_op);
    
      // partial sum
      template<class InputIt, class OutputIt>
        constexpr OutputIt partial_sum(InputIt first,
                                       InputIt last,
                                       OutputIt result);
      template<class InputIt, class OutputIt, class BinaryOperation>
        constexpr OutputIt partial_sum(InputIt first,
                                       InputIt last,
                                       OutputIt result,
                                       BinaryOperation binary_op);
    
      // exclusive scan
      template<class InputIt, class OutputIt, class T>
        constexpr OutputIt exclusive_scan(InputIt first, InputIt last,
                                          OutputIt result,
                                          T init);
      template<class InputIt, class OutputIt, class T, class BinaryOperation>
        constexpr OutputIt exclusive_scan(InputIt first, InputIt last,
                                          OutputIt result,
                                          T init, BinaryOperation binary_op);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T>
        ForwardIt2 exclusive_scan(ExecutionPolicy&& exec,
                                  ForwardIt1 first, ForwardIt1 last,
                                  ForwardIt2 result,
                                  T init);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class T,
               class BinaryOperation>
        ForwardIt2 exclusive_scan(ExecutionPolicy&& exec,
                                  ForwardIt1 first, ForwardIt1 last,
                                  ForwardIt2 result,
                                  T init, BinaryOperation binary_op);
    
      // inclusive scan
      template<class InputIt, class OutputIt>
        constexpr OutputIt inclusive_scan(InputIt first, InputIt last, OutputIt result);
      template<class InputIt, class OutputIt, class BinaryOperation>
        constexpr OutputIt inclusive_scan(InputIt first, InputIt last,
                                          OutputIt result,
                                          BinaryOperation binary_op);
      template<class InputIt, class OutputIt, class BinaryOperation, class T>
        constexpr OutputIt inclusive_scan(InputIt first, InputIt last,
                                          OutputIt result,
                                          BinaryOperation binary_op, T init);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2>
        ForwardIt2 inclusive_scan(ExecutionPolicy&& exec,
                                  ForwardIt1 first, ForwardIt1 last,
                                  ForwardIt2 result);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
               class BinaryOperation>
        ForwardIt2 inclusive_scan(ExecutionPolicy&& exec,
                                  ForwardIt1 first, ForwardIt1 last,
                                  ForwardIt2 result,
                                  BinaryOperation binary_op);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
               class BinaryOperation, class T>
        ForwardIt2 inclusive_scan(ExecutionPolicy&& exec,
                                  ForwardIt1 first, ForwardIt1 last,
                                  ForwardIt2 result,
                                  BinaryOperation binary_op, T init);
    
      // transform exclusive scan
      template<class InputIt, class OutputIt, class T,
               class BinaryOperation, class UnaryOperation>
        constexpr OutputIt transform_exclusive_scan(InputIt first, InputIt last,
                                                    OutputIt result,
                                                    T init,
                                                    BinaryOperation binary_op,
                                                    UnaryOperation unary_op);
      template<class ExecutionPolicy,
               class ForwardIt1, class ForwardIt2, class T,
               class BinaryOperation, class UnaryOperation>
        ForwardIt2 transform_exclusive_scan(ExecutionPolicy&& exec,
                                            ForwardIt1 first, ForwardIt1 last,
                                            ForwardIt2 result,
                                            T init,
                                            BinaryOperation binary_op,
                                            UnaryOperation unary_op);
    
      // transform inclusive scan
      template<class InputIt, class OutputIt,
               class BinaryOperation, class UnaryOperation>
        constexpr OutputIt transform_inclusive_scan(InputIt first, InputIt last,
                                                    OutputIt result,
                                                    BinaryOperation binary_op,
                                                    UnaryOperation unary_op);
      template<class InputIt, class OutputIt,
               class BinaryOperation, class UnaryOperation, class T>
        constexpr OutputIt transform_inclusive_scan(InputIt first, InputIt last,
                                                    OutputIt result,
                                                    BinaryOperation binary_op,
                                                    UnaryOperation unary_op,
                                                    T init);
      template<class ExecutionPolicy,
               class ForwardIt1, class ForwardIt2,
               class BinaryOperation, class UnaryOperation>
        ForwardIt2 transform_inclusive_scan(ExecutionPolicy&& exec,
                                            ForwardIt1 first, ForwardIt1 last,
                                            ForwardIt2 result,
                                            BinaryOperation binary_op,
                                            UnaryOperation unary_op);
      template<class ExecutionPolicy,
               class ForwardIt1, class ForwardIt2,
               class BinaryOperation, class UnaryOperation, class T>
        ForwardIt2 transform_inclusive_scan(ExecutionPolicy&& exec,
                                            ForwardIt1 first, ForwardIt1 last,
                                            ForwardIt2 result,
                                            BinaryOperation binary_op,
                                            UnaryOperation unary_op,
                                            T init);
    
      // adjacent difference
      template<class InputIt, class OutputIt>
        constexpr OutputIt adjacent_difference(InputIt first, InputIt last,
                                               OutputIt result);
      template<class InputIt, class OutputIt, class BinaryOperation>
        constexpr OutputIt adjacent_difference(InputIt first, InputIt last,
                                               OutputIt result,
                                               BinaryOperation binary_op);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2>
        ForwardIt2 adjacent_difference(ExecutionPolicy&& exec,
                                       ForwardIt1 first, ForwardIt1 last,
                                       ForwardIt2 result);
      template<class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
               class BinaryOperation>
        ForwardIt2 adjacent_difference(ExecutionPolicy&& exec,
                                       ForwardIt1 first, ForwardIt1 last,
                                       ForwardIt2 result,
                                       BinaryOperation binary_op);
    
      // iota
      template<class ForwardIt, class T>
        constexpr void iota(ForwardIt first, ForwardIt last, T value);
    
      namespace ranges {
        template<class O, class T>
          using iota_result = out_value_result<O, T>;
    
        template<input_or_output_iterator O, sentinel_for<O> S, weakly_incrementable T>
          requires indirectly_writable<O, const T&>
          constexpr iota_result<O, T> iota(O first, S last, T value);
    
        template<weakly_incrementable T, output_range<const T&> R>
          constexpr iota_result<borrowed_iterator_t<R>, T> iota(R&& r, T value);
      }
    
      // greatest common divisor
      template<class M, class N>
        constexpr common_type_t<M, N> gcd(M m, N n);
    
      // least common multiple
      template<class M, class N>
        constexpr common_type_t<M, N> lcm(M m, N n);
    
      // midpoint
      template<class T>
        constexpr T midpoint(T a, T b) noexcept;
      template<class T>
        constexpr T* midpoint(T* a, T* b);
    
      // saturation arithmetic
      template<class T>
        constexpr T add_sat(T x, T y) noexcept;           // freestanding
      template<class T>
        constexpr T sub_sat(T x, T y) noexcept;           // freestanding
      template<class T>
        constexpr T mul_sat(T x, T y) noexcept;           // freestanding
      template<class T>
        constexpr T div_sat(T x, T y) noexcept;           // freestanding
      template<class T, class U>
        constexpr T saturate_cast(U x) noexcept;          // freestanding
    }
```