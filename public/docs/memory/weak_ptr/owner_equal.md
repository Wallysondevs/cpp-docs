# std::weak_ptr&lt;T&gt;::owner_equal

```cpp
template< class Y >
bool owner_equal( const std::weak_ptr<Y>& other ) const noexcept;  // (1) (desde C++26)
template< class Y >
bool owner_equal( const std::shared_ptr<Y>& other ) const noexcept;  // (2) (desde C++26)
```

  
Verifica se este `weak_ptr` e `other` compartilham a propriedade ou se ambos estão vazios. A comparação é tal que dois smart pointers são considerados equivalentes apenas se ambos estiverem vazios ou se ambos possuírem o mesmo objeto, mesmo que os valores dos ponteiros obtidos por `get()` sejam diferentes (por exemplo, porque eles apontam para subobjetos diferentes dentro do mesmo objeto).

A função membro `owner_equal` é uma relação de equivalência tal que `!owner_before(other) && !other.owner_before(*this)` é verdadeiro se e somente se `owner_equal(other)` for verdadeiro.

Esta ordenação é usada para tornar shared e weak pointers utilizáveis como chaves em unordered associative containers, tipicamente através de `std::owner_equal`.

### Parâmetros

other  |  \-  |  o [std::shared_ptr](<#/doc/memory/shared_ptr>) ou [std::weak_ptr](<#/doc/memory/weak_ptr>) a ser comparado   
  
### Valor de retorno

`true` se `*this` e `other` compartilham a propriedade ou se ambos estão vazios. Caso contrário, retorna `false`.

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_smart_ptr_owner_equality`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Habilita o uso de `std::weak_ptr` como chaves em [unordered associative containers](<#/doc/container>)  
  
### Exemplo

| Esta seção está incompleta  
Razão: exemplo   
  
### Veja também

[ owner_equal](<#/doc/memory/owner_equal>)(C++26) |  fornece comparações de igualdade baseadas em propriedade de tipos mistos para shared e weak pointers   
(classe)  