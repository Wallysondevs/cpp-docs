# std::atomic_ref&lt;T&gt;::operator+=,-=

Fornecido apenas quando `T` é um tipo aritmético diferente de `_cv_ bool` ou um tipo ponteiro para objeto
value_type operator+=( difference_type arg ) const noexcept; | (1) | (constexpr desde C++26)
---|---|---
value_type operator-=( difference_type arg ) const noexcept; | (2) | (constexpr desde C++26)

Substitui atomicamente o valor atual referenciado por *`_[ptr](<#/doc/atomic/atomic_ref>)_` com o resultado de uma computação envolvendo o valor anterior e `arg`. Essas operações são operações de leitura-modificação-escrita.

1) `operator+=` realiza adição atômica. Equivalente a `return fetch_add(arg) + arg;`.

2) `operator-=` realiza subtração atômica. Equivalente a `return fetch_sub(arg) - arg;`.

  * Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos.
  * Para tipos de ponto flutuante, o [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora. A operação não precisa estar em conformidade com as traits correspondentes de [std::numeric_limits](<#/doc/types/numeric_limits>), mas é encorajada a fazê-lo. Se o resultado não for um valor representável para seu tipo, o resultado é não especificado, mas a operação, de outra forma, não tem comportamento indefinido.
  * Para tipos ponteiro, o resultado pode ser um endereço indefinido, mas a operação, de outra forma, não tem comportamento indefinido.
    * Se [std::remove_pointer_t](<#/doc/types/remove_pointer>)<T> não for um tipo de objeto completo, o programa é malformado.

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for `false`.

### Parâmetros

- **arg** — o argumento para a operação aritmética

### Valor de retorno

O valor resultante (isto é, o resultado da aplicação do operador binário correspondente ao valor referenciado por *`_[ptr](<#/doc/atomic/atomic_ref>)_` imediatamente antes dos efeitos da função membro correspondente).

### Observações

Ao contrário da maioria dos operadores de atribuição composta, os operadores de atribuição composta para `atomic_ref` retornam uma cópia do valor armazenado em vez de uma referência para `arg`.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | operadores de atribuição composta eram sem sentido para const T | restrito a aceitar apenas T não-const

### Veja também

[ fetch_add](<#/doc/atomic/atomic_ref/fetch_add>) | adiciona atomicamente o argumento ao valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_sub](<#/doc/atomic/atomic_ref/fetch_sub>) | subtrai atomicamente o argumento do valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic_ref/operator_arith>) | incrementa ou decrementa atomicamente o objeto referenciado em um
(função membro pública)
[ operator&=operator|=operator^=](<#/doc/atomic/atomic_ref/operator_arith3>) | realiza atomicamente AND, OR, XOR bit a bit com o valor referenciado
(função membro pública)