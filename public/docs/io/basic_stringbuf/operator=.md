# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::operator=

```cpp
std::basic_stringbuf& operator=( std::basic_stringbuf&& rhs );  // (1) (since C++11)
std::basic_stringbuf& operator=( const std::basic_stringbuf& rhs ) = delete;  // (2)
```

  
1) Operador de atribuição por movimento: Move o conteúdo de `rhs` para `*this`. Após o movimento, `*this` possui a string associada, o modo de abertura, o locale e todo o outro estado anteriormente mantido por `rhs`. Os seis ponteiros de [std::basic_streambuf](<#/doc/io/basic_streambuf>) em `*this` são garantidos como sendo diferentes dos ponteiros correspondentes em `rhs` (do qual o conteúdo foi movido), a menos que sejam nulos.

2) O operador de atribuição por cópia é deletado; `basic_stringbuf` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

rhs  |  \-  |  outro `basic_stringbuf` do qual o conteúdo será movido   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        std::istringstream one("one");
        std::ostringstream two("two");
     
        std::cout << "Before move, one = \"" << one.str() << '"'
                  << " two = \"" << two.str() << "\"\n";
     
        *one.rdbuf() = std::move(*two.rdbuf());
     
        std::cout << "After move, one = \"" << one.str() << '"'
                  << " two = \"" << two.str() << "\"\n";
    }
```

Saída: 
```
    Before move, one = "one" two = "two"
    After move, one = "two" two = ""
```

### Veja também

[ (constructor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) |  constrói um objeto `basic_stringbuf`   
(public member function)  