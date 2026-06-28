# std::experimental::filesystem::path::generic_string,generic_wstring,generic_u8string,...

template< class CharT, class Traits = [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;,  
class Alloc = [std::allocator](<#/doc/memory/allocator>)&lt;CharT&gt; >  
[std::basic_string](<#/doc/string/basic_string>)<CharT,Traits,Alloc>  
generic_string( const Alloc& a = Alloc() ) const; |  (1)  |  (filesystem TS)  
---|---|---
| (2) | (filesystem TS)  
[std::string](<#/doc/string/basic_string>) generic_string() const;
[std::wstring](<#/doc/string/basic_string>) generic_wstring() const;
[std::string](<#/doc/string/basic_string>) generic_u8string() const;
[std::u16string](<#/doc/string/basic_string>) generic_u16string() const;
[std::u32string](<#/doc/string/basic_string>) generic_u32string() const;

  
Retorna o nome do caminho interno no formato de nome de caminho genérico, convertido para um tipo de string específico. A conversão, se houver, é especificada em [todo](<https://en.cppreference.com/mwiki/index.php?title=todo&action=edit&redlink=1> "todo \(page does not exist\)"). O caractere `/` é usado como separador de diretório.

1) Todas as alocações de memória são realizadas por `a`.

2) A codificação no caso de `u8string()` é sempre UTF-8.

### Parâmetros

a  |  \-  |  allocator para construir a string   
-`CharT` deve ser um dos tipos de caractere codificados (char, wchar_t, char16_t e char32_t)   
  
### Valor de retorno

O nome do caminho interno no formato de nome de caminho genérico, convertido para o tipo de string especificado.

### Exceções

Pode lançar exceções definidas pela implementação.

### Ver também

[ stringwstringu8stringu16stringu32string](<#/doc/experimental/fs/path/string>) | retorna o caminho no formato de nome de caminho nativo convertido para uma string   
(função membro pública)  