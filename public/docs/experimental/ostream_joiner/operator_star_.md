```cpp
# std::experimental::ostream_joiner<DelimT,CharT,Traits>::operator*

ostream_joiner& operator*() noexcept; |  |  (library fundamentals TS v2)  
---|---|---  
| |   
  
Não faz nada, esta função membro é fornecida para satisfazer os requisitos de LegacyOutputIterator. 

Ela retorna o próprio iterator, o que torna possível usar código como `*iter = value` para enviar (inserir) o valor no stream subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

`*this`
```