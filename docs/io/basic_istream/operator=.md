# std::basic_istream&lt;CharT,Traits&gt;::operator=

```cpp
protected:
basic_istream& operator=( const basic_istream& rhs ) = delete;  // (1)
protected:
basic_istream& operator=( basic_istream&& rhs );  // (2) (desde C++11)
```

  
1) O operador de atribuição por cópia é protegido e foi deletado. Streams de entrada não são CopyAssignable.

2) O operador de atribuição por movimento (move assignment operator) troca os valores de [`gcount()`](<#/doc/io/basic_istream/gcount>) e todos os membros de dados da classe base, exceto por [`rdbuf()`](<#/doc/io/basic_ios/rdbuf>), com rhs, como se chamasse swap(*rhs). Este operador de atribuição por movimento é protegido: ele é chamado apenas pelos operadores de atribuição por movimento das classes de stream de entrada derivado movíveis [std::basic_ifstream](<#/doc/io/basic_ifstream>) e [std::basic_istringstream](<#/doc/io/basic_istringstream>), que sabem como atribuir por movimento (move-assign) corretamente os streambuffers associados.

### Parâmetros

rhs  |  \-  |  o objeto basic_istream do qual atribuir a *this  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s1;
        s1 = std::istringstream("test"); // OK
     
    //  std::cin = std::istringstream("test"); // ERROR: 'operator=' is protected
    }
```