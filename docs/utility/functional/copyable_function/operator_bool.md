# std::copyable_function::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++26)
```

  
Verifica se *this armazena um alvo chamável, ou seja, não está vazio.

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se *this armazena um alvo chamável, `false` caso contrário. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==](<#/>)(C++26) | compara um `std::copyable_function` com `nullptr`   
(função)  
[ operator bool](<#/doc/utility/functional/function/operator_bool>) | verifica se um alvo está contido   
(função membro pública de `std::function<R(Args...)>`)  
[ operator bool](<#/doc/utility/functional/move_only_function/operator_bool>) | verifica se a `std::move_only_function` possui um alvo   
(função membro pública de `std::move_only_function`)  
---