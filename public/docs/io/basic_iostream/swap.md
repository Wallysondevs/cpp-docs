# std::basic_iostream&lt;CharT,Traits&gt;::swap

```cpp
protected:
void swap( basic_iostream& other );  // (desde C++11)
```

  
Troca o estado com outro objeto de stream de entrada/saída. Efetivamente chama basic_istream<CharT,Traits>::swap(other).

Esta função membro é protegida: ela é chamada pelas funções membro `swap` das classes de stream derivadas [std::basic_stringstream](<#/doc/io/basic_stringstream>) e [std::basic_fstream](<#/doc/io/basic_fstream>), que sabem como trocar corretamente os buffers de stream associados.

### Parâmetros

other  |  \-  |  outra stream para trocar o estado   
  
### Valor de retorno

*this