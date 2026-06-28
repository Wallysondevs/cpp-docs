# std::generator&lt;Ref,V,Allocator&gt;::begin

```cpp
/*iterator*/ begin();  // (desde C++23)
```

  
Empilha [`_coroutine__`](<#/doc/coroutine/generator>) na pilha *[`_active__`](<#/doc/coroutine/generator>), então avalia coroutine_.resume().

Antes da invocação de `begin()`, o [`_coroutine__`](<#/doc/coroutine/generator>) deve referir-se a uma coroutine suspensa em seu [ponto de suspensão inicial](<#/doc/language/coroutines>).

### Valor de retorno

Um iterator cujo membro `_coroutine__` refere-se à mesma coroutine que [`_coroutine__`](<#/doc/coroutine/generator>) faz.

### Observações

É um comportamento indefinido chamar `begin()` mais de uma vez no mesmo objeto [`generator`](<#/doc/coroutine/generator>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   