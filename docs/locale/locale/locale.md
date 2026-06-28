# std::locale::locale

```cpp
  // (1)
locale() throw();  // (até C++11)
locale() noexcept;  // (desde C++11)
  // (2)
locale( const locale& other ) throw();  // (até C++11)
locale( const locale& other ) noexcept;  // (desde C++11)
explicit locale( const char* std_name );  // (3)
explicit locale( const std::string& std_name );  // (4) (desde C++11)
locale( const locale& other, const char* std_name, category cats );  // (5)
locale( const locale& other, const std::string& std_name, category cats );  // (6) (desde C++11)
template< class Facet >
locale( const locale& other, Facet* f );  // (7)
locale( const locale& other, const locale& one, category cats );  // (8)
```

  
Constrói um novo objeto locale.

1) Construtor padrão. Constrói uma cópia do locale C++ global, que é o locale mais recentemente usado como argumento para [std::locale::global](<#/doc/locale/locale/global>) ou uma cópia de [std::locale::classic](<#/doc/locale/locale/classic>)() se nenhuma chamada para [std::locale::global](<#/doc/locale/locale/global>) tiver sido feita.

2) Construtor de cópia. Constrói uma cópia de other.

3,4) Constrói uma cópia do locale do sistema com o std_name especificado (como "C", ou "POSIX", ou "en_US.UTF-8", ou "English_US.1251"), se tal locale for suportado pelo sistema operacional. O locale construído desta maneira tem um nome.

4) Equivalente a locale(std_name.c_str()).

5) Constrói uma cópia de other, exceto por todas as facets identificadas pelo argumento cats, que são copiadas do locale do sistema identificado pelo seu std_name. O locale construído desta maneira tem um nome se e somente se other tiver um nome.

6) Equivalente a locale(other, std_name.c_str(), cats).

7) Constrói uma cópia de other, exceto pela facet do tipo `Facet` (tipicamente deduzida do tipo do argumento) que é instalada a partir de f. Se f for um ponteiro nulo, o locale construído é uma cópia completa de other. O programa é malformado se `Facet` não for uma [facet](<#/doc/locale/locale/facet>) ou se for uma facet qualificada como volatile.

Se f for nulo, o locale construído tem o mesmo nome que other. Caso contrário, o locale construído não tem nome.

8) Constrói uma cópia de other, exceto por todas as facets identificadas pelo argumento cats, que são copiadas de one.

Se cats for igual a `locale::none`, o locale construído tem um nome se e somente se other tiver um nome. Caso contrário, o locale construído tem um nome se e somente se other e one ambos tiverem nomes.

### Parâmetros

other  |  \-  |  outro locale para copiar   
---|---|---
std_name  |  \-  |  nome do locale do sistema a ser usado   
f  |  \-  |  ponteiro para uma facet a ser mesclada com other  
cats  |  \-  |  as categorias de facet usadas para identificar as facets a serem mescladas com other  
one  |  \-  |  outro locale para pegar facets   
  
### Exceções

3,5) [std::runtime_error](<#/doc/error/runtime_error>) se o sistema operacional não tiver um locale chamado std_name ou se std_name for um ponteiro nulo.

4,6) [std::runtime_error](<#/doc/error/runtime_error>) se o sistema operacional não tiver um locale chamado std_name.

### Observações

A sobrecarga ([7](<#/doc/locale/locale/locale>)) é tipicamente chamada com seu segundo argumento, f, obtido diretamente de uma new-expression: o locale é responsável por chamar o delete correspondente de seu próprio destrutor.

### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <iostream>
    #include <locale>
     
    std::ostream& operator<< (std::ostream& os, const std::locale& loc)
    {
        if (loc.name().length() <= 80)
            os << loc.name();
        else
            for (const auto c : loc.name())
                os << c << (c == ';' ? "\n  " : "");
     
        return os << '\n';
    }
     
    int main()
    {
        std::locale l1;
        std::cout << "Name of a copy of the classic \"C\" locale: " << l1;
     
        std::locale l2("en_US.UTF-8");
        std::cout << "Name of unicode locale: " << l2;
     
        std::locale l3(l1, new std::codecvt_utf8<wchar_t>);
        std::cout << "Name of \"C\" locale except for codecvt: " << l3;
     
        std::locale l4(l1, l2, std::locale::ctype);
        std::cout << "Name of \"C\" locale except for ctype, which is unicode:\n  " << l4;
    }
```

Saída possível:
```
    Name of a copy of the classic "C" locale: C
    Name of unicode locale: en_US.UTF-8
    Name of "C" locale except for codecvt: *
    Name of "C" locale except for ctype, which is unicode:
      LC_CTYPE=en_US.UTF-8;
      LC_NUMERIC=C;
      LC_TIME=C;
      LC_COLLATE=C;
      LC_MONETARY=C;
      LC_MESSAGES=C;
      LC_PAPER=C;
      LC_NAME=C;
      LC_ADDRESS=C;
      LC_TELEPHONE=C;
      LC_MEASUREMENT=C;
      LC_IDENTIFICATION=C
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 436](<https://cplusplus.github.io/LWG/issue436>) | C++98  | para a sobrecarga ([7](<#/doc/locale/locale/locale>)), não estava claro se `Facet` pode ser cv-qualificada  | pode ser const-qualificada, mas não volatile-qualificada   
[LWG 2295](<https://cplusplus.github.io/LWG/issue2295>) | C++98  | para a sobrecarga ([7](<#/doc/locale/locale/locale>)), o locale construído não tinha nome mesmo se f fosse nulo  | ele tem o nome de other  
  
### Veja também

[ (destrutor)](<#/doc/locale/locale/~locale>) |  destrói o locale e as facets cuja contagem de referência se torna zero   
(função membro pública)  
  
### Links externos

1\.  | [Lista de nomes de locale do Windows](<https://ss64.com/locale.html>).   
---|---
2\.  | [Lista de nomes de locale do Linux](<https://lh.2xlibre.net/locales/>). 