# std::atomic_ref&lt;T&gt;::operator=

```cpp
value_type operator=( value_type desired ) const noexcept; |  (1) | (constexpr desde C++26)
atomic_ref& operator=( const atomic_ref& ) = delete;  // (2)
```

  
1) Equivalente a `store(desired); return desired;`. Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_const_v](<#/doc/types/is_const>)<T>` for `false`.

2) `atomic_ref` não é `[CopyAssignable](<#/doc/named_req/CopyAssignable>)`.

### Parâmetros

desired  |  \-  |  valor a atribuir   
  
### Valor de retorno

Conforme descrito acima. 

### Observações

Ao contrário da maioria dos operadores de atribuição, o operador de atribuição para `atomic_ref` não retorna uma referência ao seu argumento do lado esquerdo. Ele retorna uma cópia do valor armazenado em vez disso. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++20  | operador de atribuição era sem sentido para `const T` | restrito para aceitar apenas `T` não-`const`  
  
### Veja também

[ (constructor)](<#/doc/atomic/atomic_ref/atomic_ref>) |  constrói um objeto `atomic_ref`   
(função membro pública)  
[ store](<#/doc/atomic/atomic_ref/store>) |  substitui atomicamente o valor do objeto referenciado por um argumento não-atômico   
(função membro pública)