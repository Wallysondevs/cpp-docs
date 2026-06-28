# std::ostreambuf_iterator&lt;CharT,Traits&gt;::failed

```cpp
bool failed() const throw();  // (até C++11)
bool failed() const noexcept;  // (desde C++11)
```

  
Retorna `true` se o iterator encontrou a condição de fim de arquivo, isto é, se uma chamada anterior a [std::basic_streambuf::sputc](<#/doc/io/basic_streambuf/sputc>) (feita por [`operator=`](<#/>)) retornou `Traits::eof`. 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se este iterator encontrou a condição de fim de arquivo na saída, `false` caso contrário. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   