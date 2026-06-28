# std::basic_ios&lt;CharT,Traits&gt;::move

```cpp
protected:
void move( basic_ios& other );  // (desde C++11)
protected:
void move( basic_ios&& other );  // (desde C++11)
```

  
Substitui o estado atual pelo de `other`, exceto pelo `rdbuf` associado. `other` fica em um estado válido, mas não especificado, após a chamada. Após a chamada a esta função, [rdbuf()](<#/doc/io/basic_ios/rdbuf>) retorna um ponteiro nulo, other.rdbuf() retorna o mesmo valor de antes da chamada, e other.tie() retorna um ponteiro nulo. 

Esta função membro é protegida: ela é chamada pelos construtores de movimento protegidos das classes de stream derivadas [std::basic_ostream](<#/doc/io/basic_ostream>) e [std::basic_istream](<#/doc/io/basic_istream>), que, por sua vez, são chamados pelos construtores de movimento públicos das classes de stream ainda mais derivadas, como [std::basic_ofstream](<#/doc/io/basic_ofstream>), que sabem como mover corretamente o streambuffer associado. 

### Parâmetros

other  |  \-  |  o objeto `basic_ios` do qual transferir o estado   
  
### Valor de retorno

(nenhum) 

### Veja também

[ swap](<#/doc/io/basic_ios/swap>)(C++11) |  troca com outro [std::basic_ios](<#/doc/io/basic_ios>) exceto por `rdbuf`   
(função membro protegida)  