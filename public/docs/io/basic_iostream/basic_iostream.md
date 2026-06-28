# std::basic_iostream&lt;CharT,Traits&gt;::basic_iostream

```cpp
explicit basic_iostream( std::basic_streambuf<CharT,Traits>* sb );  // (1)
basic_iostream( const basic_iostream& other ) = delete;  // (2) (desde C++11)
protected:
basic_iostream( basic_iostream&& other );  // (3) (desde C++11)
```

  
Constrói um novo objeto de stream.

1) Inicializa com o streambuf sb. As classes base são inicializadas como basic_istream<CharT,Traits>(sb) e basic_ostream<CharT,Traits>(sb). Após a chamada, rdbuf() == sb e gcount() == 0.

2) A construção por cópia não é permitida.

3) Construtor de movimento (move constructor): move-constrói a primeira classe base `basic_istream` como basic_istream<CharT,Traits>(std::move(rhs));, que por sua vez move-constrói e inicializa a base virtual [std::basic_ios](<#/doc/io/basic_ios>). A inicialização da outra base, `basic_ostream`, é definida pela implementação (por exemplo, um construtor padrão protegido pode ser adicionado a [std::basic_ostream](<#/doc/io/basic_ostream>), que não faz nada) porque a construção por movimento não pode usar `rhs` duas vezes. Este construtor de movimento é protegido: ele é chamado pelos construtores de movimento das classes de stream derivadas [std::basic_fstream](<#/doc/io/basic_fstream>) e [std::basic_stringstream](<#/doc/io/basic_stringstream>) antes que elas move-construam e associem o stream buffer.

### Parâmetros

sb  |  \-  |  streambuf para inicializar   
---|---|---
other  |  \-  |  outro stream para inicializar   
  
### Veja também

[ operator=](<#/>)(C++11) |  move-atribui outro `basic_iostream`   
(função membro protegida)  