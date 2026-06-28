# std::shared_ptr&lt;T&gt;::owner_hash

```cpp
std::size_t owner_hash() const noexcept;  // (desde C++26)
```

  
Retorna um valor não especificado tal que para qualquer objeto `other` onde `owner_equal(other)` é verdadeiro, `owner_hash() == other.owner_hash()` é verdadeiro.

Este hashing é usado para tornar shared e weak pointers utilizáveis como chaves em contêineres associativos não ordenados, tipicamente através de `std::owner_hash`.

### Valor de retorno

Um valor que é idêntico para qualquer objeto `std::shared_ptr` ou `std::weak_ptr` que compartilha a mesma propriedade (ownership).

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_smart_ptr_owner_equality`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Habilitando o uso de `std::shared_ptr` como chaves em [contêineres associativos não ordenados](<#/doc/container>)  
  
### Exemplo

| Esta seção está incompleta  
Razão: exemplo   
  
### Veja também

[ owner_hash](<#/doc/memory/owner_hash>)(C++26) |  fornece hashing baseado em proprietário para shared e weak pointers   
(classe)  