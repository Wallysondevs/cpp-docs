# std::ostreambuf_iterator&lt;CharT,Traits&gt;::ostreambuf_iterator

```cpp
  // (1)
ostreambuf_iterator( streambuf_type* buffer ) throw(); |  | (ate C++11)
ostreambuf_iterator( streambuf_type* buffer ) noexcept;  // (desde C++11)
  // (2)
ostreambuf_iterator( ostream_type& stream ) throw(); |  | (ate C++11)
ostreambuf_iterator( ostream_type& stream ) noexcept;  // (desde C++11)
```

  
1) Constrói o iterator com o membro privado `streambuf_type*` definido para buffer e a flag [`failed()`](<#/doc/iterator/ostreambuf_iterator/failed>) definida como false. O comportamento é indefinido se buffer for um ponteiro nulo.

2) O mesmo que ostreambuf_iterator(stream.rdbuf()).

### Parâmetros

stream  |  \-  |  o stream de saída cujo `rdbuf()` será acessado por este iterator   
---|---|---
buffer  |  \-  |  o buffer do stream de saída a ser acessado por este iterator   
  
### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        const char* file = "test.txt";
        {
            std::basic_filebuf<char> f;
            f.open(file, std::ios::out);
            std::ostreambuf_iterator<char> out1(&f);
            *out1 = 'a'; // writes to file via iterator
        }
     
        // read back from the file
        char a;
        std::cout << ((std::ifstream{file} >> a), a) << std::endl;
     
        std::ostreambuf_iterator<wchar_t> out2{std::wcout};
        *out2 = L'b';
    }
```

Saída: 
```
    a
    b
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 112](<https://cplusplus.github.io/LWG/issue112>) | C++98  | o requisito "o argumento não pode  
ser nulo" foi aplicado à sobrecarga (2)  | aplica-se à sobrecarga  
(1) em vez disso   
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | construtor padrão foi fornecido, pois iterators C++20 devem ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido juntamente com  
o requisito 