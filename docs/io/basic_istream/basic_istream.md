# std::basic_istream&lt;CharT,Traits&gt;::basic_istream

```cpp
explicit basic_istream( std::basic_streambuf<CharT, Traits>* sb );  // (1)
protected:
basic_istream( const basic_istream& rhs ) = delete;  // (2) (desde C++11)
protected:
basic_istream( basic_istream&& rhs );  // (3) (desde C++11)
```

  
1) Constrói o objeto `basic_istream`, atribuindo valores iniciais à classe base chamando basic_ios::init(sb). O valor de `gcount()` é inicializado para zero. 

2) O construtor de cópia é protegido e é deletado. Streams de entrada não são copiáveis. 

3) O construtor de movimento (move constructor) copia o valor de `gcount()` de rhs, define o valor de gcount() de rhs para zero, e usa basic_ios<CharT, Traits>::move(rhs) para mover todos os membros de basic_ios, exceto o `rdbuf()`, de rhs para *this. Este construtor de movimento é protegido: ele é chamado pelos construtores de movimento de classes de stream de entrada movíveis [std::basic_ifstream](<#/doc/io/basic_ifstream>) e [std::basic_istringstream](<#/doc/io/basic_istringstream>), que sabem como mover corretamente o buffer de stream associado. 

### Parâmetros

sb  |  \-  |  streambuffer a ser usado como dispositivo subjacente   
  
### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s1("hello");
        std::istream s2(s1.rdbuf()); // OK: s2 compartilha o buffer com s1
     
    //  std::istream s3(std::istringstream("test")); // ERRO: construtor de movimento é protegido
    //  std::istream s4(s2);                         // ERRO: construtor de cópia é deletado
        std::istringstream s5(std::istringstream("world")); // OK: construtor de movimento chamado
                                                            //     pela classe derivada
     
        std::cout << s2.rdbuf() << ' ' << s5.rdbuf() << '\n';
    }
```

Output: 
```
    hello world
```