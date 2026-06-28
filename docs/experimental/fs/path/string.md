# std::experimental::filesystem::path::string,wstring,u8string,...

template< class CharT, class Traits = [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;,  
class Alloc = [std::allocator](<#/doc/memory/allocator>)&lt;CharT&gt; >  
[std::basic_string](<#/doc/string/basic_string>)<CharT,Traits,Alloc>  
string( const Alloc& a = Alloc() ) const; |  (1)  |  (filesystem TS)  
---|---|---
| (2) | (filesystem TS)  
[std::string](<#/doc/string/basic_string>) string() const;
[std::wstring](<#/doc/string/basic_string>) wstring() const;
[std::string](<#/doc/string/basic_string>) u8string() const;
[std::u16string](<#/doc/string/basic_string>) u16string() const;
[std::u32string](<#/doc/string/basic_string>) u32string() const;

  
Retorna o nome do caminho interno no formato de nome de caminho nativo, convertido para um tipo de string específico. A conversão, se houver, é especificada em [todo](<https://en.cppreference.com/mwiki/index.php?title=todo&action=edit&redlink=1> "todo \(page does not exist\)"). 

1) Todas as alocações de memória são realizadas por a.

2) A codificação no caso de `u8string()` é sempre UTF-8.

### Parâmetros

(nenhum) 

### Valor de retorno

O nome do caminho interno no formato de nome de caminho nativo, convertido para o tipo de string especificado. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdio>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::locale::global(std::locale("en_US.utf8"));
    
        fs::path p = fs::u8path(u8"要らない.txt");
    
        // a representação de string nativa pode ser usada com APIs do SO
        std::ofstream(p) << "File contents"; // isso usa operator string()
        if (std::FILE* f = std::fopen(p.c_str(), "r"))
        {
            int ch;
            while ((ch=fgetc(f))!= EOF) putchar(ch);
            std::fclose(f);
        }
    
        // a representação multibyte e wide pode ser usada para saída
        std::cout.imbue(std::locale());
        std::cout << "\nNome do arquivo em codificação multibyte estreita: "
                  << p.string() << '\n';
    
        std::wcerr.imbue(std::locale());
        std::wcerr << "Nome do arquivo em codificação wide: "
                   << p.wstring() << '\n';
    
        fs::remove(p);
    }
```

Saída possível: 
```
    Conteúdo do arquivo
    Nome do arquivo em codificação multibyte estreita: 要らない.txt
    Nome do arquivo em codificação wide: 要らない.txt
```

### Veja também

[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/experimental/fs/path/generic_string>) | retorna o caminho no formato de nome de caminho genérico convertido para uma string   
(função membro pública)  