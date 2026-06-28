# std::error_category::equivalent

```cpp
virtual bool equivalent( int code,
const std::error_condition& condition ) const noexcept;  // (1) (desde C++11)
virtual bool equivalent( const std::error_code& code,
int condition ) const noexcept;  // (2) (desde C++11)
```

  
Verifica se o código de erro é equivalente a uma condição de erro para a categoria de erro representada por *this.

1) Equivalente a default_error_condition(code) == condition.

2) Equivalente a *this == code.category() && code.value() == condition.

### Parâmetros

code  |  \-  |  especifica o código de erro a comparar   
---|---|---
condition  |  \-  |  especifica a condição de erro a comparar   
  
### Valor de retorno

true se o código de erro for equivalente à condição de erro fornecida para a categoria de erro representada por *this, false caso contrário. 