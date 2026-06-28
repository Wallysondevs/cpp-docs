# std::ranges::zip_view&lt;Views...&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr auto operator*() const;  // (desde C++23)
```

  
Retorna uma [std::tuple](<#/doc/utility/tuple>) que consiste em elementos subjacentes apontados.

Seja [`_current__`](<#/doc/ranges/zip_view/iterator>) o objeto tipo tupla subjacente que contém iteradores para elementos de views adaptadas. Equivalente a:
```cpp
    return /*tuple-transform*/( -> decltype(auto) { return *i; }, current_);
```

### Parâmetros

(nenhum)

### Valor de retorno

O elemento tipo tupla atual.

### Observações

`operator->` não é fornecido.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   