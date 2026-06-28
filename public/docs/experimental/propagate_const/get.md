# std::experimental::propagate_const&lt;T&gt;::get

constexpr element_type* get(); |  |  (library fundamentals TS v2)  
---|---|---
constexpr const element_type* get() const; |  |  (library fundamentals TS v2)  

  
Retorna um ponteiro para o objeto apontado pelo objeto tipo ponteiro encapsulado, `t_`. 

### Parâmetros

(nenhum) 

### Valor de retorno

Se `T` for um tipo de ponteiro para objeto, então `t_`. Caso contrário, `t_.get()`. 

  

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   