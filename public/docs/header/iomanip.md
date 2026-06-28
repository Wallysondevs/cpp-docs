# Cabeçalho da biblioteca padrão &lt;iomanip&gt;

Este cabeçalho faz parte da biblioteca [Input/output](<#/doc/io/manip>).

### Funções

---
[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa os flags ios_base especificados
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define os flags `ios_base` especificados
(função)
[ setbase](<#/doc/io/manip/setbase>) | muda a base usada para E/S de inteiros
(função)
[ setfill](<#/doc/io/manip/setfill>) | muda o caractere de preenchimento
(modelo de função)
[ setprecision](<#/doc/io/manip/setprecision>) | muda a precisão de ponto flutuante
(função)
[ setw](<#/doc/io/manip/setw>) | muda a largura do próximo campo de entrada/saída
(função)
[ get_money](<#/doc/io/manip/get_money>)(desde C++11) | analisa um valor monetário
(modelo de função)
[ put_money](<#/doc/io/manip/put_money>)(desde C++11) | formata e exibe um valor monetário
(modelo de função)
[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)
[ put_time](<#/doc/io/manip/put_time>)(desde C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(modelo de função)
[ quoted](<#/doc/io/manip/quoted>)(desde C++14) | insere e extrai strings entre aspas com espaços incorporados
(modelo de função)

### Sinopse
```cpp
    namespace std {
      /*unspecified*/ resetiosflags(ios_base::fmtflags mask);
      /*unspecified*/ setiosflags  (ios_base::fmtflags mask);
      /*unspecified*/ setbase(int base);
      template<class CharT> /*unspecified*/ setfill(CharT c);
      /*unspecified*/ setprecision(int n);
      /*unspecified*/ setw(int n);
      template<class MoneyT> /*unspecified*/ get_money(MoneyT& mon, bool intl = false);
      template<class MoneyT> /*unspecified*/ put_money(const MoneyT& mon, bool intl = false);
      template<class CharT> /*unspecified*/ get_time(tm* tmb, const CharT* fmt);
      template<class CharT> /*unspecified*/ put_time(const tm* tmb, const CharT* fmt);
    
      template<class CharT>
        /*unspecified*/ quoted(const CharT* s, CharT delim = CharT('"'),
                               CharT escape = CharT('\\'));
    
      template<class CharT, class Traits, class Allocator>
        /*unspecified*/ quoted(const basic_string<CharT, Traits, Allocator>& s,
                   CharT delim = CharT('"'), CharT escape = CharT('\\'));
    
      template<class CharT, class Traits, class Allocator>
        /*unspecified*/ quoted(basic_string<CharT, Traits, Allocator>& s,
                   CharT delim = CharT('"'), CharT escape = CharT('\\'));
    
      template<class CharT, class Traits>
        /*unspecified*/ quoted(basic_string_view<CharT, Traits> s,
                   CharT delim = CharT('"'), CharT escape = CharT('\\'));
    }
```