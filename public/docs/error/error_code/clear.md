# std::error_code::clear

```cpp
void clear() noexcept;  // (desde C++11)
```

Substitui o código de erro e a categoria de erro por valores padrão.

Equivalente a *this = error_code(0, [std::system_category](<#/doc/error/system_category>)()).

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)