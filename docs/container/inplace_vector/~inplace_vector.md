# std::inplace_vector&lt;T,N&gt;::~inplace_vector

```cpp
constexpr ~inplace_vector();  // (desde C++26)
```

  
Um [destrutor](<#/doc/language/destructor>). Além disso, um [destrutor trivial](<#/doc/language/destructor>) se [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)&lt;T&gt; for verdadeiro. Destrói o `inplace_vector`. Os destrutores dos elementos são chamados e o armazenamento utilizado é desalocado. Observe que, se os elementos forem ponteiros, os objetos apontados não são destruídos. 

### Complexidade

Linear no tamanho do `inplace_vector`. 