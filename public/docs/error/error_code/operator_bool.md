# std::error_code::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++11)
```

Verifica se o valor do código de erro é válido, ou seja, diferente de zero.

### Parâmetros

(nenhum)

### Valor de retorno

`false` se `value() == 0`, `true` caso contrário.

### Notas

Embora este operador seja frequentemente usado como uma abreviação conveniente para verificar se algum erro foi retornado, como em `if (ec) { /* handle error */ }`, tal uso não é robusto: alguns códigos de erro, por exemplo, `HTTP status code 200`, também podem indicar sucesso.