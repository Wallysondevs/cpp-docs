# std::error_category::default_error_condition

```cpp
virtual std::error_condition default_error_condition( int val ) const noexcept;  // (desde C++11)
```

  
Retorna a condição de erro para o valor de erro fornecido.

Equivalente a [std::error_condition](<#/doc/error/error_condition>)(val, *this).

Classes derivadas de `error_category` podem sobrescrever esta função para mapear certos valores de erro para uma categoria genérica. Por exemplo, [std::system_category](<#/doc/error/system_category>) sobrescreve esta função para mapear os valores de erro que correspondem aos valores POSIX [errno](<#/doc/error/errno>) para [std::generic_category](<#/doc/error/generic_category>).

### Parâmetros

val  |  \-  |  valor de erro para o qual retornar a condição de erro   
  
### Valor de retorno

A condição de erro para o código de erro fornecido.