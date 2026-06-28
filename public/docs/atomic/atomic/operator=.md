# std::atomic&lt;T&gt;::operator=

```cpp
T operator=( T desired ) noexcept;  // (1) (desde C++11)
T operator=( T desired ) volatile noexcept;  // (2) (desde C++11)
atomic& operator=( const atomic& ) = delete;  // (3) (desde C++11)
atomic& operator=( const atomic& ) volatile = delete;  // (4) (desde C++11)
```

  
1,2) Atribui atomicamente `desired` à variável atômica. Equivalente a `store(desired)`. É descontinuado se `[std::atomic](<#/doc/atomic/atomic>)<T>::is_always_lock_free` for `false` e a sobrecarga (2) participar da resolução de sobrecarga. | (desde C++20)  
  
3,4) Variáveis atômicas não são [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

desired  |  \-  |  valor a atribuir   
  
### Valor de retorno

1,2) `desired`

### Observações

Ao contrário da maioria dos operadores de atribuição, os operadores de atribuição para tipos atômicos não retornam uma referência aos seus argumentos do lado esquerdo. Em vez disso, eles retornam uma cópia do valor armazenado. 

### Veja também

[ (construtor)](<#/doc/atomic/atomic/atomic>) |  constrói um objeto atômico   
(função membro pública)  