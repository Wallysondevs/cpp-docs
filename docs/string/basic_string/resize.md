# std::basic_string&lt;CharT,Traits,Allocator&gt;::resize

void resize( size_type count ); |  (1) | (constexpr desde C++20)  
---|---|---
void resize( size_type count, CharT ch ); |  (2) | (constexpr desde C++20)  

  
Redimensiona a string para conter count caracteres.

Se o tamanho atual for menor que count, caracteres adicionais são anexados:

1) Inicializa os caracteres anexados com CharT() ('\0' se `CharT` for char).

2) Inicializa os caracteres anexados com ch.

Se o tamanho atual for maior que count, a string é reduzida aos seus primeiros count elementos.

### Parâmetros

count  |  \-  |  novo tamanho da string   
---|---|---
ch  |  \-  |  caractere para inicializar os novos caracteres   
  
### Exceções

[std::length_error](<#/doc/error/length_error>) se count > max_size() for verdadeiro. Quaisquer exceções lançadas pelo `Allocator` correspondente.

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <stdexcept>
     
    int main()
    {
        const unsigned desired_length{8};
        std::string long_string("Where is the end?");
        std::string short_string("H");
     
        std::cout << "Basic functionality:\n"
                  << "Shorten:\n"
                  << "1. Before: " << std::quoted(long_string) << '\n';
        long_string.resize(desired_length);
        std::cout << "2. After:  " << std::quoted(long_string) << '\n';
     
        std::cout << "Lengthen with a given value 'a':\n"
                  << "3. Before: " << std::quoted(short_string) << '\n';
        short_string.resize(desired_length, 'a');
        std::cout << "4. After:  " << std::quoted(short_string) << '\n';
     
        std::cout << "Lengthen with char() == " << static_cast<int>(char()) << '\n'
                  << "5. Before: " << std::quoted(short_string) << '\n';
        short_string.resize(desired_length + 3);
        std::cout << "6. After:  \"";
        for (char c : short_string)
            std::cout << (c == char() ? '@' : c);
        std::cout << "\"\n\n";
     
        std::cout << "Errors:\n";
        std::string s;
     
        try
        {
            // size is OK, no length_error
            // (may throw bad_alloc)
            s.resize(s.max_size() - 1, 'x');
        }
        catch (const std::bad_alloc& ex)
        {
            std::cout << "1. Exception: " << ex.what() << '\n';
        }
     
        try
        {
            // size is OK, no length_error
            // (may throw bad_alloc)
            s.resize(s.max_size(), 'x');
        }
        catch (const std::bad_alloc& ex)
        {
            std::cout << "2. Exception: " << ex.what() << '\n';
        }
     
        try
        {
            // size is BAD, throw length_error
            s.resize(s.max_size() + 1, 'x');
        }
        catch (const std::length_error& ex)
        {
            std::cout << "3. Length error: " << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    Basic functionality:
    Shorten:
    1. Before: "Where is the end?"
    2. After:  "Where is"
    Lengthen with a given value 'a':
    3. Before: "H"
    4. After:  "Haaaaaaa"
    Lengthen with char() == 0
    5. Before: "Haaaaaaa"
    6. After:  "Haaaaaaa@@@"
     
    Errors:
    1. Exception: std::bad_alloc
    2. Exception: std::bad_alloc
    3. Length error: basic_string::_M_replace_aux
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98  | o comportamento era indefinido se  
count > max_size() fosse verdadeiro | sempre lança uma exceção neste caso   
  
### Veja também

[ sizelength](<#/doc/string/basic_string/size>) |  retorna o número de caracteres   
(função membro pública)  
[ reserve](<#/doc/string/basic_string/reserve>) |  reserva armazenamento   
(função membro pública)  
[ shrink_to_fit](<#/doc/string/basic_string/shrink_to_fit>)(DR*) |  reduz o uso de memória liberando memória não utilizada   
(função membro pública)