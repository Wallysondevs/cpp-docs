# std::condition_variable_any::condition_variable_any

```cpp
condition_variable_any();  // (1) (desde C++11)
condition_variable_any( const condition_variable_any& ) = delete;  // (2) (desde C++11)
```

  
1) Constrói um objeto do tipo `std::condition_variable_any`.

2) O construtor de cópia é deletado.

### Parâmetros

(nenhum) 

### Exceções

1) Pode lançar [std::system_error](<#/doc/error/system_error>) com [std::error_condition](<#/doc/error/error_condition>) igual a [std::errc::operation_not_permitted](<#/doc/error/errc>) se a thread não tiver privilégio para criar uma condition variable, [std::errc::resource_unavailable_try_again](<#/doc/error/errc>) se uma limitação de recurso não-memória impedir esta inicialização, ou outro valor definido pela implementação.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2092](<https://cplusplus.github.io/LWG/issue2092>) | C++11  | a condição de erro para [resource_unavailable_try_again](<#/doc/error/errc>) estava incorreta  | corrigido   
  
### Veja também

[Documentação C](<#/>) para cnd_init  
---