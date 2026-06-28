# std::basic_fstream&lt;CharT,Traits&gt;::native_handle

```cpp
native_handle_type native_handle() const noexcept;  // (desde C++26)
```

  
Retorna o handle subjacente definido pela implementação associado a `basic_filebuf`. O comportamento é indefinido se is_open() for `false`. 

### Valor de retorno

rdbuf()->native_handle()

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_fstream_native_handle`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | suporte a native handles   
  
### Exemplo

| Esta seção está incompleta  
Motivo: exemplo   