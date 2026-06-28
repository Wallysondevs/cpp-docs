# std::stop_source::stop_possible

```cpp
bool stop_possible() const noexcept;  // (desde C++20)
```

  
Verifica se o objeto `stop_source` possui um estado de parada. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o objeto `stop_source` possui um estado de parada, caso contrário false. 

### Observações

Se o objeto `stop_source` possui um estado de parada e uma solicitação de parada já foi feita, esta função ainda retorna true. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   