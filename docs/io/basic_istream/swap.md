# std::basic_istream&lt;CharT,Traits&gt;::swap

```cpp
protected:
void swap( basic_istream& rhs );  // (desde C++11)
```

  
Chama `basic_ios::swap(rhs)` para trocar todos os membros de dados da classe base, exceto por [`rdbuf()`](<#/doc/io/basic_ios/rdbuf>), e troca os valores dos contadores [`gcount()`](<#/doc/io/basic_istream/gcount>) entre `*this` e `rhs`. Esta função `swap` é protegida: ela é chamada pelas funções `swap` das classes de stream de entrada trocáveis [`std::basic_ifstream`](<#/doc/io/basic_ifstream>) e [`std::basic_istringstream`](<#/doc/io/basic_istringstream>), que sabem como trocar corretamente os streambuffers associados. 

### Parâmetros

rhs  |  \-  |  outro objeto `basic_istream` do mesmo tipo para trocar com   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <utility>
    
    int main()
    {
        std::istringstream s1("hello");
        std::istringstream s2("bye");
    
        s1.swap(s2); // OK, istringstream has a public swap()
        std::swap(s1, s2); // OK, calls s1.swap(s2)
    //  std::cin.swap(s2); // ERROR: swap is a protected member
    
        std::cout << s1.rdbuf() << '\n';
    }
```

Saída: 
```
    hello
```