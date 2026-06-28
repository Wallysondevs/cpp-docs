# std::basic_ofstream&lt;CharT,Traits&gt;::native_handle

```cpp
native_handle_type native_handle() const noexcept;  // (desde C++26)
```

  
Retorna o handle subjacente definido pela implementação associado a `basic_filebuf`. O comportamento é indefinido se `is_open()` for falso. 

### Valor de retorno

rdbuf()->native_handle()

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_fstream_native_handle`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | suporte a handles nativos   
  
### Exemplo

| Esta seção está incompleta  
Razão: exemplo   