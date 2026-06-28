# std::filesystem::operator/(std::filesystem::path)

```cpp
friend path operator/( const path& lhs, const path& rhs );  // (desde C++17)
```

  
Concatena dois componentes de path usando o separador de diretório preferencial, se apropriado (veja [`operator/=`](<#/doc/filesystem/path/append>) para detalhes).

Efetivamente retorna path(lhs) /= rhs.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::filesystem::path é uma classe associada dos argumentos. Isso previne conversões indesejadas na presença de uma _using-directive_ `using namespace std::filesystem;`.

### Parâmetros

lhs, rhs  |  \-  |  paths para concatenar   
  
### Valor de retorno

O resultado da concatenação de paths.

### Exemplo

Run this code
```cpp
    #include <filesystem>
    #include <iostream>
     
    int main()
    {
    #   if defined(_WIN32) // see e.g. stackoverflow.com/questions/142508
     
        std::filesystem::path p = "C:";
     
        std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p / "Users" / "batman" << '\n';
     
    #   else // __linux__ etc
     
        std::filesystem::path p = "/home";
     
        std::cout << "\"/home\" / \"tux\" / \".fonts\" == " << p / "tux" / ".fonts" << '\n';
     
    #   endif
    }
```

Saída possível: 
```
    Windows specific output:
    "C:" / "Users" / "batman" == "C:Users\batman"
     
    Linux etc specific output:
    "/home" / "tux" / ".fonts" == "/home/tux/.fonts"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3065](<https://cplusplus.github.io/LWG/issue3065>) | C++17  | permitia concatenar tudo conversível para `path` na presença de uma _using-directive_ | tornou-se hidden friend   
  
### Veja também

[ appendoperator/=](<#/doc/filesystem/path/append>) |  anexa elementos ao path com um separador de diretório   
(função membro pública)  