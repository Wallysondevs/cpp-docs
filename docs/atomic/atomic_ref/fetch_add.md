# std::atomic_ref&lt;T&gt;::fetch_add

Fornecido apenas quando `T` é um tipo aritmético diferente de `_cv_ bool` ou um tipo ponteiro para objeto
value_type fetch_add( difference_type arg,
[std::memory_order](<#/doc/atomic/memory_order>) order =
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; | | (constexpr desde C++26)

Substitui atomicamente o valor atual referenciado por *`_[ptr](<#/doc/atomic/atomic_ref>)_`* pelo resultado da adição aritmética do valor e `arg`. Esta operação é uma operação de leitura-modificação-escrita (read-modify-write). A memória é afetada de acordo com o valor de `order`.

*   Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos.
*   Para tipos de ponto flutuante, o [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora. A operação não precisa estar em conformidade com as características (traits) correspondentes de [std::numeric_limits](<#/doc/types/numeric_limits>), mas é encorajada a fazê-lo. Se o resultado não for um valor representável para seu tipo, o resultado é não especificado, mas a operação, de outra forma, não tem comportamento indefinido.
*   Para tipos ponteiro, o resultado pode ser um endereço indefinido, mas a operação, de outra forma, não tem comportamento indefinido.
    *   Se [std::remove_pointer_t](<#/doc/types/remove_pointer>)<T> não for um tipo de objeto completo, o programa é malformado.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for `false`.

### Parameters

- **arg** — o outro argumento da adição aritmética
- **order** — restrições de ordem de memória a serem impostas

### Return value

O valor referenciado por *`_[ptr](<#/doc/atomic/atomic_ref>)_`* , imediatamente antes dos efeitos desta função.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | `fetch_add` não tinha sentido para const T | restrito a aceitar apenas T não-const