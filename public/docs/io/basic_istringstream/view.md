# std::basic_istringstream&lt;CharT,Traits,Allocator&gt;::view

```cpp
std::basic_string_view<CharT, Traits> view() const noexcept;  // (desde C++20)
```

  
Obtém um [std::basic_string_view](<#/doc/string/basic_string_view>) sobre o objeto string subjacente. Equivalente a `return rdbuf()->view();`. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um [std::basic_string_view](<#/doc/string/basic_string_view>) sobre o objeto string subjacente. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        // input/output stream
        std::stringstream buf1;
        buf1 << 69;
        int n = 0;
        buf1 >> n;
        std::cout << "1) buf1 = [" << buf1.view() << "], n = " << n << '\n';
     
        // output stream in append mode
        std::ostringstream buf2("test", std::ios_base::ate);
        buf2 << '1';
        std::cout << "2) buf2 = [" << buf2.view() << "]\n";
     
        // input stream
        std::istringstream inbuf("-42");
        inbuf >> n;
        std::cout << "3) inbuf = [" << inbuf.view() << "], n = " << n << '\n';
    }
```

Saída: 
```
    1) buf1 = [69], n = 69
    2) buf2 = [test1]
    3) inbuf = [-42], n = -42
```

### Veja também

[ view](<#/doc/io/basic_stringbuf/view>)(C++20) | obtém uma view sobre a sequência de caracteres subjacente   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)  