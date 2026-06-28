# std::generator&lt;Ref,V,Allocator&gt;::~generator

```cpp
~generator();  // (desde C++23)
```

  
Destrói o objeto generator.

Dado [`_coroutine__`](<#/doc/coroutine/generator>) como o objeto coroutine subjacente, equivalente a:
```cpp
    if (coroutine_)
        coroutine_.destroy();
```

Note que destruir o generator raiz efetivamente destrói toda a pilha de generators cedidos, porque a propriedade de generators cedidos recursivamente é mantida em objetos awaitable no frame da coroutine do generator que cede.

### Complexity

| Esta seção está incompleta   
  
### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   