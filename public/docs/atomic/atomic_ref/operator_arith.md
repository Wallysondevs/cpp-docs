# std::atomic_ref&lt;T&gt;::operator++,++(int),--,--(int)

```cpp
Fornecido apenas quando `T` é um tipo integral diferente de _cv_ bool ou um tipo ponteiro para objeto
value_type operator++() const noexcept;  // (1) (desde C++20)
value_type operator++( int ) const noexcept;  // (2) (desde C++20)
value_type operator\--() const noexcept;  // (3) (desde C++20)
value_type operator\--( int ) const noexcept;  // (4) (desde C++20)
```

Incrementa ou decrementa atomicamente o valor atual do objeto referenciado. Essas operações são operações de leitura-modificação-escrita.

1) Realiza o pré-incremento atômico. Equivalente a return fetch_add(1) + 1;.

2) Realiza o pós-incremento atômico. Equivalente a return fetch_add(1);.

3) Realiza o pré-decremento atômico. Equivalente a return fetch_sub(1) - 1;

4) Realiza o pós-decremento atômico. Equivalente a return fetch_sub(1);.

  * Para tipos integrais com sinal, a aritmética é definida para usar a representação de complemento de dois. Não há resultados indefinidos.
  * Para tipos ponteiro para objeto, o resultado pode ser um endereço indefinido, mas as operações, de outra forma, não têm comportamento indefinido. O programa é malformado se [std::remove_pointer_t](<#/doc/types/remove_pointer>)&lt;T&gt; não for um tipo de objeto completo.

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false.

### Valor de retorno

1,3) O valor do objeto referenciado após a modificação.

2,4) O valor do objeto referenciado antes da modificação.

### Observações

Ao contrário da maioria dos operadores de pré-incremento e pré-decremento, os operadores de pré-incremento e pré-decremento para `atomic_ref` não retornam uma referência ao objeto modificado. Eles retornam uma cópia do valor armazenado.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | operadores de incremento e decremento eram sem sentido para const T | restrito a aceitar apenas `T` não-const

### Ver também

[ fetch_add](<#/doc/atomic/atomic_ref/fetch_add>) | adiciona atomicamente o argumento ao valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(public member function)
[ fetch_sub](<#/doc/atomic/atomic_ref/fetch_sub>) | subtrai atomicamente o argumento do valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(public member function)
[ operator+=operator-=](<#/doc/atomic/atomic_ref/operator_arith2>) | adiciona ou subtrai atomicamente do valor referenciado
(public member function)
[ operator&=operator|=operator^=](<#/doc/atomic/atomic_ref/operator_arith3>) | realiza atomicamente AND, OR, XOR bit a bit com o valor referenciado
(public member function)