# std::atomic_ref&lt;T&gt;::operator&amp;=,|=,^=

```cpp
Fornecido apenas quando `T` é um tipo integral diferente de _cv_ bool
value_type operator&=( value_type arg ) const noexcept;  // (1) (desde C++20)
value_type operator|=( value_type arg ) const noexcept;  // (2) (desde C++20)
value_type operator^=( value_type arg ) const noexcept;  // (3) (desde C++20)
```

Substitui atomicamente o valor atual do objeto referenciado pelo resultado de uma computação envolvendo o valor anterior e `arg`. Essas operações são operações de leitura-modificação-escrita.

* `operator&=` executa um AND bit a bit atômico. Equivalente a `return fetch_and(arg) & arg;`.
* `operator|=` executa um OR bit a bit atômico. Equivalente a `return fetch_or(arg) | arg;`.
* `operator^=` executa um XOR bit a bit atômico. Equivalente a `return fetch_xor(arg) ^ arg;`.

Essas sobrecargas participam da resolução de sobrecarga apenas se `[std::is_const_v](<#/doc/types/is_const>)<T>` for `false`.

### Parâmetros

- **arg** — o argumento para a operação aritmética

### Valor de retorno

O valor resultante (isto é, o resultado da aplicação do operador binário correspondente ao valor imediatamente anterior aos efeitos da função membro correspondente).

### Observações

Ao contrário da maioria dos operadores de atribuição composta, os operadores de atribuição composta para `atomic_ref` não retornam uma referência aos seus argumentos do lado esquerdo. Eles retornam uma cópia do valor armazenado em vez disso.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | operadores de atribuição composta eram sem sentido para const T | restrito a aceitar apenas T não-const

### Veja também

[ fetch_and](<#/doc/atomic/atomic_ref/fetch_and>) | executa atomicamente um AND bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_or](<#/doc/atomic/atomic_ref/fetch_or>) | executa atomicamente um OR bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_xor](<#/doc/atomic/atomic_ref/fetch_xor>) | executa atomicamente um XOR bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic_ref/operator_arith>) | incrementa ou decrementa atomicamente o objeto referenciado em um
(função membro pública)
[ operator+=operator-=](<#/doc/atomic/atomic_ref/operator_arith2>) | adiciona ou subtrai atomicamente do valor referenciado
(função membro pública)