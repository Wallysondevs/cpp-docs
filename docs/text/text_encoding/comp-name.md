# std::text_encoding::comp-name

```cpp
static constexpr bool /*comp-name*/( std::string_view a, std::string_view b );  // (desde C++26)
(apenas para exposição*)
```

  
Compara duas strings a e b codificadas em codificação literal ordinária seguindo as regras de [Unicode Charset Alias Matching](<https://www.unicode.org/reports/tr22/tr22-8.html#Charset_Alias_Matching>).

Duas strings são consideradas iguais ao comparar da esquerda para a direita após:

  * remover todos os caracteres não alfanuméricos,
  * converter todas as letras para a mesma caixa (maiúscula/minúscula), e
  * remover quaisquer sequências autônomas de caracteres '0' que não sigam imediatamente um prefixo numérico. Um prefixo numérico consiste em um dígito não-zero ('1' a '9') opcionalmente seguido por um ou mais caracteres não alfanuméricos.

Aqui estão os seguintes exemplos:
```
    static_assert(/*comp-name*/("UTF-8", "utf8") == true);
    static_assert(/*comp-name*/("u.t.f-008", "utf8") == true);
    static_assert(/*comp-name*/("ISO-8859-1", "iso88591") == true);
    static_assert(/*comp-name*/("ut8", "utf8") == false);
    static_assert(/*comp-name*/("utf-80", "utf8") == false);
```

### Parâmetros

a, b  |  \-  |  strings para comparar   
  
### Valor de retorno

true se as duas strings compararem como iguais conforme descrito acima; false caso contrário.