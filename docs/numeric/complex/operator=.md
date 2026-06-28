# std::complex&lt;T&gt;::operator=

```cpp
Todas as especializações
  // (1)
complex& operator=( const complex& cx );  // (até C++20)
constexpr complex& operator=( const complex& cx );  // (desde C++20)
  // (2)
template< class X >
complex& operator=( const std::complex<X>& cx );  // (até C++20)
template< class X >
constexpr complex& operator=( const std::complex<X>& cx );  // (desde C++20)
Template primário `complex<T>`
  // (3)
complex& operator=( const T& x );  // (até C++20)
constexpr complex& operator=( const T& x );  // (desde C++20)
Especializações para tipos de ponto flutuante padrão `complex<F>` (até C++23)
  // (3)
complex& operator=( F x );  // (até C++20)
constexpr complex& operator=( F x );  // (desde C++20)
(até C++23)
```

Atribui novos valores ao conteúdo.

1,2) Atribui [cx.real()](<#/doc/numeric/complex/real>) e [cx.imag()](<#/doc/numeric/complex/imag>) às partes real e imaginária do número complexo, respectivamente. O operador de atribuição de cópia (1) é [trivial](<#/doc/language/as_operator>) quando `T` é um tipo de ponto flutuante. (desde C++23)

3) Atribui x à parte real do número complexo. A parte imaginária é definida como zero.

### Parâmetros

- **x** — valor a atribuir
- **cx** — valor complexo a atribuir

### Valor de retorno

*this

### Observações

O operador de atribuição de cópia é exigido como [trivial](<#/doc/language/as_operator>) desde C++23, mas as implementações geralmente o tornam trivial em todos os modos.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3935](<https://cplusplus.github.io/LWG/issue3935>) | C++98 | a descrição da sobrecarga (2) estava faltando | adicionada

### Veja também

[ (construtor)](<#/doc/numeric/complex/complex>) | constrói um número complexo
(função membro pública)
[ operator""ifoperator""ioperator""il](<#/doc/numeric/complex/operator_q__q_i>)(C++14) | um literal [std::complex](<#/doc/numeric/complex>) representando um número puramente imaginário
(função)