# Cabeçalho da biblioteca padrão &lt;codecvt&gt; (desde C++11)(obsoleto desde C++17)(removido em C++26)

Este cabeçalho faz parte da [biblioteca de processamento de texto](<#/doc/text>).

### Classes

---
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(modelo de classe)
[ codecvt_utf16](<#/doc/locale/codecvt_utf16>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-16 e UCS-2/UCS-4
(modelo de classe)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(modelo de classe)
[ codecvt_mode](<#/doc/locale/codecvt_mode>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | tags para alterar o comportamento dos facets codecvt padrão
(enum)

### Notas

`<codecvt>` é obsoleto desde C++17 e removido em C++26 (veja [P2871R3](<https://wg21.link/P2871R3>)).

A razão para a remoção é que este recurso não implementa mais o [Padrão Unicode](<https://www.unicode.org/versions/latest/>) atual, suportando apenas a codificação obsoleta UCS-2.

### Sinopse
```cpp
    namespace std {
      enum codecvt_mode {
        consume_header = 4,
        generate_header = 2,
        little_endian = 1
      };
    
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf8;
    
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf16;
    
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf8_utf16;
    }
```

#### Classe [std::codecvt_utf8](<#/doc/locale/codecvt_utf8>)
```cpp
    namespace std {
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf8 : public codecvt<Elem, char, mbstate_t> {
        public:
          explicit codecvt_utf8(size_t refs = 0);
          ~codecvt_utf8();
        };
    }
```

#### Classe [std::codecvt_utf16](<#/doc/locale/codecvt_utf16>)
```cpp
    namespace std {
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf16 : public codecvt<Elem, char, mbstate_t> {
        public:
          explicit codecvt_utf16(size_t refs = 0);
          ~codecvt_utf16();
        };
    }
```

#### Classe [std::codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)
```cpp
    namespace std {
      template<class Elem, unsigned long Maxcode = 0x10ffff,
               codecvt_mode Mode = (codecvt_mode)0>
        class codecvt_utf8_utf16 : public codecvt<Elem, char, mbstate_t> {
        public:
          explicit codecvt_utf8_utf16(size_t refs = 0);
          ~codecvt_utf8_utf16();
        };
    }
```