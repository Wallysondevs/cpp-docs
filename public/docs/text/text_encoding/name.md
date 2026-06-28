# std::text_encoding::name

```cpp
constexpr const char* name() const noexcept;  // (desde C++26)
```

  
Retorna o nome primário de *this. Equivalente a `return` ` _[name_](<#/doc/locale/text_encoding>)_` ;`. 

Acessar elementos de `_[name_](<#/doc/locale/text_encoding>)_` fora do range `[`name()`, `name() + [std::strlen](<#/doc/string/byte/strlen>)(name()) + 1`)` é comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Nome primário `_[name_](<#/doc/locale/text_encoding>)_` que é representado por uma string de bytes terminada em nulo. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   